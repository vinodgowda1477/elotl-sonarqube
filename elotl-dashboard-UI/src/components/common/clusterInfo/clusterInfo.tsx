import * as React from 'react';

export interface IClusterInfoProps {
    clusterDetails?;
}

export default class ClusterInfo extends React.Component<IClusterInfoProps> {
  public render() {
    const {clusterDetails} = this.props;
    return (
        <div className="table-data">
        <div className="row-tbdata">
            <span>Cluster ID:</span>
            <p>{clusterDetails && clusterDetails.cluster_id}</p>
        </div>
        <div className="row-tbdata">
            <span>Provider:</span>
            <p>{clusterDetails && clusterDetails.provider}</p>
        </div>
        <div className="row-tbdata">
            <span> Status:</span>
            <p>{clusterDetails && clusterDetails.is_healthy?"Healthy":"Unhealthy"}</p>
        </div>
    </div>
    );
  }
}
