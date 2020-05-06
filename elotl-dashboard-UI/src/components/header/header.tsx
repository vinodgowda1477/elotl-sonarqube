import React from 'react';
import user_img from '../../images/user_img.png';
import search from '../../images/Search.png';
import notify from '../../images/Notification.png';
import './style.scss';

export interface IheaderProps {

}

export interface IheaderState {

}

class Header extends React.Component<IheaderProps, IheaderState> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="header">
                <div className="hdr-content">
                    <div className="lft-sec">
                        <a href="/">Home</a>
                    </div>
                    <div className="right-sec">
                        <img src={search} alt="search-img" className="search" />
                        <img src={notify} alt="notify-img" className="notify" />
                        <img src={user_img} alt="user-img" className="user-icons" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;