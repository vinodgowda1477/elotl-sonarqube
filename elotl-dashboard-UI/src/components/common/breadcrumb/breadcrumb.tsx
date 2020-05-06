import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss';
import { baseRoutes } from '../../../constants/routes';
export interface IBreadcrumbProps {
    path?;
    page?;
    secondaryPath?;
    secondaryPage?;
}

export interface IBreadcrumbState {

}

class Breadcrumb extends React.Component<IBreadcrumbProps, IBreadcrumbState> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ul className="breadcrumb">
                <li> <Link to={baseRoutes.HOME}>Home</Link></li>
                <li> <Link to={baseRoutes.DASHBOARD}>Nodeless Clusters</Link></li>
                {this.props.page && <li> <Link to={this.props.path}>{this.props.page}</Link></li>}
                {this.props.secondaryPage && <li> <Link to={this.props.secondaryPath}>{this.props.secondaryPage}</Link></li>}
            </ul >
        );
    }
}

export default Breadcrumb;