import React from 'react'
import { Link } from 'react-router-dom';
import { baseRoutes } from "../../constants/routes";
import './style.scss';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import Selectbox from '../common/selectbox/selectbox';
import Smcard from '../common/smcard/smcard';
import backarrow from '../../images/backarrow.png'
import SemiProgressBar from '../common/semiprogress/SemiProgressBar';
import Loader from '../common/loader/loader';
import Axios from 'axios';
import ClusterInfo from '../../containers/clusterInfoContainer';


export interface IDeploymentDetailsProps {
    namespaceList;
    dashAction;
    selectedCluster?;
    namespaceDetails?;
    history;
    deploymentList;
    deploymentDetails;
    selectedNamespace;
    selectedDeployment;
}

export interface IDeploymentDetailsState {
    modalOpen: boolean;
    namespace: string;
    displayDeploymentDetailsFlag: boolean;
    defaultNamespace;
    selectedDeployment;
}

class DeploymentDetails extends React.Component<IDeploymentDetailsProps, IDeploymentDetailsState> {
    public timer;
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            namespace: "",
            displayDeploymentDetailsFlag: false,
            defaultNamespace: "",
            selectedDeployment: ""
        };
        this.setPolling = this.setPolling.bind(this);
    }
    componentDidMount() {
        if(!this.state.defaultNamespace && this.props.selectedNamespace){
            const { namespaceList, selectedNamespace } = this.props;
                const objIndex = namespaceList.findIndex(elem => {
                    return elem.value === selectedNamespace;
                })
                this.setState({ defaultNamespace: this.props.namespaceList[objIndex] });
        }
        this.timer = setInterval(
            () => this.setPolling(),
            2000
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.namespaceList !== this.props.namespaceList) {
            const { namespaceList, selectedNamespace } = this.props;
            const objIndex = namespaceList.findIndex(elem => {
                return elem.value === selectedNamespace;
            })
            this.getNameSpaceDetails(this.props.namespaceList[objIndex]);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setPolling() {
        const { selectedCluster, selectedNamespace, selectedDeployment } = this.props;
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
        if (numberOfCallPending === 0) {
            if (selectedCluster && selectedNamespace && selectedDeployment) {
                this.props.dashAction.getDeploymentDetails(selectedCluster, selectedNamespace, selectedDeployment);
            }
        }
    }

    getNameSpaceDetails(data) {
        const { selectedCluster } = this.props;
        this.setState({
            namespace: data.value,
            displayDeploymentDetailsFlag: false,
            defaultNamespace: data,
            selectedDeployment: ""
        });
        this.props.dashAction.getSelectedNamespace(data.value);
        this.props.dashAction.getNamespaceDetails(selectedCluster, data.value);
        this.props.dashAction.getDeploymentList(selectedCluster, data.value);
        this.props.history.push(baseRoutes.DETAILPAGE);
    }

    render() {
        const resource = this.props.deploymentDetails.resource_count;
        const usage = this.props.deploymentDetails.resource_info && this.props.deploymentDetails.resource_info.usage;
        return (
            <div className="detailspage">
                {resource ?
                    <><div className="details-page">
                        <Link to={baseRoutes.DETAILPAGE}><img src={backarrow} alt="back-arrow" />
                            <p>Back</p> </Link>
                        <h1>{this.props.selectedDeployment}</h1>
                        <Breadcrumb path={baseRoutes.DETAILPAGE} page={this.props.selectedNamespace}
                            secondaryPath={baseRoutes.DEPLOYMENT_DETAILS}
                            secondaryPage={this.props.selectedDeployment} />
                        <ClusterInfo/>
                        <Selectbox
                            lable={'Namespace'}
                            options={this.props.namespaceList}
                            onChange={this.getNameSpaceDetails.bind(this)}
                            selectedValue={this.state.defaultNamespace}
                        />
                    </div>
                        {resource && <div className="sm-card-sec">
                            <Smcard title={resource.cells} name="Pods" class="deployment-card" />
                            <Smcard title={resource.pods} name="Compute Cells" class="deployment-card" />

                        </div>}
                        <div className="dtl-piecharts">
                            <SemiProgressBar lable={'Memory in GiB'} progress={usage.memory_percentage === 0 ? 0.1 : usage.memory_percentage} memory={usage.memory} className="bar-1" />
                            <SemiProgressBar lable={'CPU Cores'} progress={usage.cpu_percentage === 0 ? 0.1 : usage.cpu_percentage} memory={usage.cpu} className="bar-1"/>
                        </div></>
                    :
                    <Loader />
                }
            </div>
        );
    }
}

export default DeploymentDetails;
