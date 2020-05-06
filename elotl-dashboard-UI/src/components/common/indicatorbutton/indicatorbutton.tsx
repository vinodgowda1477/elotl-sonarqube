import React from 'react';
import './style.scss';

export interface IIndicatorbuttonProps {
    color?: string;
    label: string;
    className?: string
}

export interface IIndicatorbuttonState {

}

class Indicatorbutton extends React.Component<IIndicatorbuttonProps, IIndicatorbuttonState> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className={"indicatr-btn " + this.props.className}>
                <div className={'circle ' + this.props.color}>

                </div>
                <span>{this.props.label}</span>
            </div>
        );
    }
}

export default Indicatorbutton;