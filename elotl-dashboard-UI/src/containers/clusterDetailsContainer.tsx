import { connect } from "react-redux";
import * as dashboardAction from '../actions/dashboard';
import { bindActionCreators } from 'redux';
import ClusterDetails from "../components/detailPages/clusterDetails";

const mapStateToProps = state => {
  return {
    clusterDetails: state.dashboardReducer.clusterDetails,
    namespaceList: state.dashboardReducer.namespaceList,
    selectedCluster: state.dashboardReducer.selectedCluster,
    selectedNamespace: state.dashboardReducer.selectedNamespace,
    selectedDeployment: state.dashboardReducer.selectedDeployment,
    namespaceDetails: state.dashboardReducer.namespaceDetails,
    deploymentList: state.dashboardReducer.deploymentList,
    deploymentDetails: state.dashboardReducer.deploymentDetails,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    dashAction: bindActionCreators(dashboardAction, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(ClusterDetails);