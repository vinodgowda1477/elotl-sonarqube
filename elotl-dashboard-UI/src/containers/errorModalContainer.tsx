import { connect } from "react-redux";
import ErrorModal from "../components/common/errorModal/errorModal";
import * as dashboardAction from '../actions/dashboard';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return {
      error: state.dashboardReducer.error
    };
  };

const mapDispatchtoProps = dispatch => {
return {
    errorActions: bindActionCreators(dashboardAction, dispatch)
}
};
  
export default connect(
mapStateToProps,
mapDispatchtoProps
)(ErrorModal);