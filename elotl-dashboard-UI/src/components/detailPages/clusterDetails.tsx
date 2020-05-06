import React from 'react'
import { Link } from 'react-router-dom';
import { baseRoutes } from "../../constants/routes";
import './style.scss';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import Selectbox from '../common/selectbox/selectbox';
import Smcard from '../common/smcard/smcard';
import VerticalModal from '../common/modal/modal';
import backarrow from '../../images/backarrow.png'
import SemiProgressBar from '../common/semiprogress/SemiProgressBar';
import Loader from '../common/loader/loader';
import {KUBE_SYSTEM} from '../../config/demoConfig'
import Axios from 'axios';
import ClusterInfo from '../../containers/clusterInfoContainer';

export interface IDetailspageProps {
    namespaceList;
    dashAction;
    selectedCluster?;
    namespaceDetails?;
    history;
    deploymentList;
    deploymentDetails;
    selectedNamespace;
    selectedDeployment;
    clusterDetails;
}

export interface IDetailspageState {
    modalOpen: boolean;
    namespace: string;
    displayDeploymentDetailsFlag: boolean;
    defaultNamespace;
}

class Detailspage extends React.Component<IDetailspageProps, IDetailspageState> {
    public timer;
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            namespace: "",
            displayDeploymentDetailsFlag: false,
            defaultNamespace: ""
        };
        this.openModal = this.openModal.bind(this);
        this.deploymentDetail = this.deploymentDetail.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if(!this.state.defaultNamespace && this.props.selectedNamespace){
            const {namespaceList, selectedNamespace} = this.props;
            const objIndex = namespaceList.findIndex(elem=>{
                return elem.value === selectedNamespace;
            })
            this.getNameSpaceDetails(this.props.namespaceList[objIndex]);
        }
        this.timer = setInterval(
            () => this.setPolling(),
            2000
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.namespaceList !== this.props.namespaceList) {
            const { namespaceList } = this.props;
            const objIndex = namespaceList.findIndex(elem => {
                return elem.value === KUBE_SYSTEM;
            })
            this.getNameSpaceDetails(this.props.namespaceList[objIndex]);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setPolling(){
        const {selectedCluster, selectedNamespace} = this.props;
        let numberOfCallPending = 0;

        // Add a request interceptor
        Axios.interceptors.request.use(function (config) {
            numberOfCallPending++;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        // Add a response interceptor
        Axios.interceptors.response.use(function (response) {
            numberOfCallPending--;
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
        if(numberOfCallPending === 0){
            if(selectedCluster && selectedNamespace){
                this.props.dashAction.getNamespaceDetails(selectedCluster,selectedNamespace);
            }
        }
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    deploymentDetail(selectedDeployment) {
        const { selectedCluster } = this.props;
        const { namespace } = this.state;
        const deployment = selectedDeployment.target.id;
        this.setState({ displayDeploymentDetailsFlag: true });
        this.props.dashAction.getSelectedDeployment(deployment);
        this.props.dashAction.getDeploymentDetails(selectedCluster, namespace, deployment);
        this.closeModal();
        this.props.history.push(baseRoutes.DEPLOYMENT_DETAILS);
    }

    getNameSpaceDetails(data) {
        const { selectedCluster } = this.props;
        this.setState({ namespace: data.value, displayDeploymentDetailsFlag: false, defaultNamespace: data });
        this.props.dashAction.getSelectedNamespace(data.value);
        this.props.dashAction.getNamespaceDetails(selectedCluster, data.value);
        this.props.dashAction.getDeploymentList(selectedCluster, data.value);
    }

    render() {
        const { namespaceDetails, clusterDetails } = this.props;
        const usage = namespaceDetails.resource_info && namespaceDetails.resource_info.usage;
        return (
            <div className="detailspage">
                {namespaceDetails.resources ?
                    <><div className="details-page">
                        <Link to={baseRoutes.DASHBOARD}><img src={backarrow} alt="back-arrow" />
                            <p>Back</p> </Link>
                        <h1>{clusterDetails && clusterDetails.name}</h1>
                        <Breadcrumb path={baseRoutes.DETAILPAGE} page={this.props.selectedCluster} />
                        <ClusterInfo/>
                        <Selectbox
                            lable={'Namespace'}
                            options={this.props.namespaceList}
                            onChange={this.getNameSpaceDetails.bind(this)}
                            selectedValue={this.state.defaultNamespace} />
                    </div>
                        <div className="sm-card-sec">
                            {namespaceDetails.resources && <><Smcard title={clusterDetails && clusterDetails.worker_node_count} name="Worker Nodes" />
                                <Smcard title={namespaceDetails.resources.deployments} name="Deployments" onClick={this.openModal} />
                                <Smcard title={namespaceDetails.resources.pods} name="Pods" />
                                <Smcard title={namespaceDetails.resources.cells} name="Compute Cells" /></>
                            }
                        </div>
                        <div className="dtl-piecharts">
                            <SemiProgressBar lable={'Memory in GiB'} progress={usage.memory_percentage === 0 ? 0.1 : usage.memory_percentage} memory={usage.memory} className="bar-1" />
                            <SemiProgressBar lable={'CPU Cores'} progress={usage.cpu_percentage === 0 ? 0.1 :usage.cpu_percentage} memory={usage.cpu} className="bar-1" />
                        </div>
                        {
                            this.state.modalOpen ? (
                                <VerticalModal onClick={this.deploymentDetail} closeModal={this.closeModal} deploymentList={this.props.deploymentList} />
                            ) : ''
                        }
                    </>
                    :
                    <Loader />}
            </div>
        );
    }
}

export default Detailspage;
