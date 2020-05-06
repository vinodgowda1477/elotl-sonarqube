import React from 'react';
import './style.scss';
import FlipNumbers from 'react-flip-numbers';
export interface ISmcardProps {
    title: string;
    name: string;
    onClick?: (id: any) => any;
    class?: string;
}

export interface ISmcardState {

}

class Smcard extends React.Component<ISmcardProps, ISmcardState> {
    constructor(props: ISmcardProps) {
        super(props);
        this.state = {};
    }
    render() {
        const path = window.location.pathname;
        return (
            <div className={"sm-card " + this.props.class} onClick={this.props.onClick}>
                <div className="card-content">
                    <h2>
                        {path === "/deploymentDetails" ?
                            <FlipNumbers
                                play
                                width={30}
                                height={50}
                                color="#ffffff"
                                background="inherit"
                                numbers={this.props.title.toString()}
                                duration={3}
                                delay={0}
                                numberStyle={{'font-size':"44px",'font-family':"'Montserrat', sans-serif"}} />
                            :
                            this.props.title
                        }
                    </h2>
                    <p>{this.props.name}</p>
                </div>
            </div>
        );
    }
}

export default Smcard;