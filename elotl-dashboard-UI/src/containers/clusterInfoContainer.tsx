import { connect } from "react-redux";
import ClusterInfo from "../components/common/clusterInfo/clusterInfo";

const mapStateToProps = state => {
  return {
    clusterDetails: state.dashboardReducer.clusterDetails
  };
};

export default connect(
  mapStateToProps,
)(ClusterInfo);