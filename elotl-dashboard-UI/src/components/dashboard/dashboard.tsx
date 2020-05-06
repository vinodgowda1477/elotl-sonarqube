import React, { Component } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import Selectbox from '../common/selectbox/selectbox';
import SemiProgressBar from '../common/semiprogress/SemiProgressBar';
// import SemiCircleProgressBar from "react-progressbar-semicircle";
// owl carousel
import OwlCarousel from 'react-owl-carousel2';

import Card from '../common/card/card';
import Indicatorbutton from '../common/indicatorbutton/indicatorbutton';
import Loader from '../common/loader/loader';
import { baseRoutes } from '../../constants/routes';
import './owl.carousel.css';
import './owl.theme.default.css';
import './style.scss';
import {options,cloudProviderOption} from '../../config/demoConfig'

interface IDashboardProps {
    dashboardData;
    dashAction;
    history
}

export default class Dashboard extends Component<IDashboardProps, {}> {
    constructor(props) {
        super(props);
        this.navigatePage = this.navigatePage.bind(this);
    }

    componentDidMount() {
        this.props.dashAction.getClusterListing()
    }

    navigatePage(cluster, is_mock) {
        if (is_mock === false) {
            this.props.dashAction.getSelectedCluster(cluster);
            this.props.dashAction.getClusterDetails(cluster);
            this.props.dashAction.getNamespaceList(cluster);
            this.props.history.push(baseRoutes.DETAILPAGE);
        }
    }

    render() {
        return (
            <div className="dashboard-page">
                {this.props.dashboardData.clusterList.length > 0 ?
                    <>
                        <h1>Nodeless Clusters</h1>
                        <Breadcrumb />
                        <Selectbox lable={'Cloud Provider'} disable={true} options={cloudProviderOption} selectedValue={cloudProviderOption[0]} />
                        {/* <SemiCircleProgressBar percentage={10}/>; */}
                        <OwlCarousel options={options}>
                            {this.props.dashboardData.clusterList && this.props.dashboardData.clusterList.map((elem, i) => {
                                const cluster = elem.name;
                                const usage = elem.resource_info.usage;;
                                const resources = elem.resources;
                                const is_mock = elem.is_mock;
                                const is_healthy = elem.is_healthy;
                                return <Card title={cluster} className="lg-card" span_text="active" is_healthy={is_healthy} cardData={resources} onClick={this.navigatePage.bind(this, cluster, is_mock)} key={"card" + i}>
                                    <SemiProgressBar lable={'Memory in GiB'} progress={usage.memory_percentage === 0 ? 0.1 : usage.memory_percentage} memory={usage.memory} className={'bar-1'} />
                                    <SemiProgressBar lable={'CPU Cores'} progress={usage.cpu_percentage === 0 ? 0.1 : usage.cpu_percentage} memory={usage.cpu} className={'bar-1 bar-2'} />
                                    <div className="indicators">
                                        <Indicatorbutton label="Used" color="yellow" className="mrg-right" />
                                        <Indicatorbutton label="Available" />
                                    </div>
                                </Card>
                            })}
                        </OwlCarousel>

                    </> : <Loader />}
            </div>
        )
    }
}