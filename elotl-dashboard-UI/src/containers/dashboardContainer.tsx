import { connect } from "react-redux";
import Dashboard from "../components/dashboard/dashboard";
import * as dashboardAction from '../actions/dashboard';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return {
    dashboardData: state.dashboardReducer
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
)(Dashboard);