import React from 'react';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import './style.scss'

interface ISemiProgressBarProps {
  progress: number;
  lable: string;
  memory: number;
  className?;
}

const SemiProgressBar: React.FunctionComponent<ISemiProgressBarProps> = (props) => {
  return(
    <div className="progress-bar">
        <div className={props.className}>
          {props.progress && <SemiCircleProgressBar percentage={props.progress} stroke="#FFDD00" strokeWidth={4} background="#F5F6F7" />}
          <div className="progress-wraper">
            <div className="pg-title">{props.memory}</div>
            <div className="pg-label">{props.lable}</div>
            <div className="bdr-btm"></div>
          </div>
        </div>
      </div>
  ) ;
};

export default SemiProgressBar;
