import React from 'react';
import './style.scss';

interface IErrorModalProps{
    errorActions?;
    error?;
}

class ErrorModal extends React.Component<IErrorModalProps,{}> {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    handlePropogation(e){
        e.stopPropagation();  
    }

    closeModal(){
        console.log("Clicked");
        // this.props.closeModal();
        this.props.errorActions.resetError();
    }

    render() {
        console.log("error---->>>>>",this.props.error);
        return (
            <div className="modal-window">
                <div className="md-outer-container" onClick={this.handlePropogation}>
                    <div className="modal-body">
                        <p className="error-header">Error</p>
                        <p className="error-message">{this.props.error && this.props.error.message ? this.props.error.message : ""}</p>
                            <button className="secondary-btn" onClick={this.closeModal}>
                                OK
                            </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default ErrorModal;