import React from 'react';
import './style.scss';
export interface ILoaderProps {

}

export interface ILoaderState {

}

class Loader extends React.Component<ILoaderProps, ILoaderState> {
    constructor(props: ILoaderProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="loader">
                <div className="center-pos">
                    <div className="loadingio-spinner-spinner-hq20ompo0j"><div className="ldio-yfd9u0da10p">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div></div>
                </div>

            </div>
        );
    }
}

export default Loader;