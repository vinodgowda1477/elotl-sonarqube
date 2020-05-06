import React from 'react';
import './style.scss';

export interface ICardProps {
    cardData?;
    className: string;
    title: string;
    onClick?: (id: any) => any;
    span_text?: string;
    is_healthy?: boolean;
}

export interface ICardState {

}

class Card extends React.Component<ICardProps, ICardState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { cardData } = this.props;
        return (
            <div className={"card " + this.props.className} onClick={this.props.onClick}>
                <h2>{this.props.title}</h2>
                <div className="stauts">
                    <div className="status-row">
                        <h6>Status</h6>
                        <span className={'span-text ' + this.props.span_text}>{this.props.is_healthy?"Healthy":"Unhealthy"}</span>
                    </div>
                    <div className="status-row">
                        <h6>Deployments</h6>
                        <span className={'span-text'}>{cardData && cardData.deployments}</span>
                    </div>
                    <div className="status-row">
                        <h6>Pods</h6>
                        <span className={'span-text'}>{cardData && cardData.pods}</span>
                    </div>
                    <div className="status-row">
                        <h6>Compute cells</h6>
                        <span className={'span-text'}>{cardData && cardData.cells}</span>
                    </div>
                </div>
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default Card;