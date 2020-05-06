import React from 'react';
import { Link } from 'react-router-dom';
import { baseRoutes } from '../../constants/routes';
import logo from '../../images/Logo.png'
import './style.scss';

interface IHomeProps {
    homeAction;
}

export default class Home extends React.Component<IHomeProps, {}> {
    componentDidMount() {
        this.props.homeAction.setSignInFlag(false);
    }

    render() {
        return (
            <div className="home-page">
                <div className="content">
                    <img src={logo} alt="logo" />
                    <p>Nodeless Kubernetes</p>
                    <div className="btn-sec">
                        <Link to={baseRoutes.DASHBOARD} onClick={() => this.props.homeAction.setSignInFlag(true)}><button className="primary-btn">Start</button></Link>
                    </div>
                </div>

            </div>
        );
    }
}