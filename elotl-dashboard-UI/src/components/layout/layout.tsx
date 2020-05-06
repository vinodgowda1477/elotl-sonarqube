import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Routes from '../../routes';
import Header from '../header/header';
import './style.scss';
import ErrorModal from '../../containers/errorModalContainer';

interface ILayoutProps {
    signIn?;
    error?;
}

interface ILayoutState {
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props) {

        super(props);

        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                {this.props.signIn && <Sidebar />}
                {this.props.signIn && <Header />}
                {this.props.signIn ?
                    <div className="App-body">
                        <Routes />
                        {this.props.error && <ErrorModal/>}
                    </div>
                    :
                    <Routes />
                }
            </React.Fragment>
        );
    }
}