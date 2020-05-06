import React from 'react';
import './style.scss';

export interface IModalProps {
    onClick: (id: any) => any
    closeModal?;
    deploymentList?;
}

export interface IModalState {

}

class VerticalModal extends React.Component<IModalProps, IModalState> {
    constructor(props: IModalProps) {
        super(props);
        this.state = {};
    }
    handlePropogation(e){
        e.stopPropagation();  
    }
    render() {
        return (
            <div className="modal-window" onClick={this.props.closeModal}>
                <div className="md-outer-container" onClick={this.handlePropogation}>
                    <div className="modal-body">
                        <p>Select a Deployment</p>
                        {this.props.deploymentList.map((elem,i)=>{
                            return <button className="secondary-btn" onClick={this.props.onClick} id={elem.value} key={i}>
                                {elem.value}
                            </button>
                        })
                        }
                        {/* <button className="secondary-btn">
                            demo-deployment-1
                        </button> */}
                    </div>
                </div>
            </div>

        );
    }
}

export default VerticalModal;