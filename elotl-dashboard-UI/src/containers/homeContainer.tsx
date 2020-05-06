import { connect } from "react-redux";
import Home from "../components/home/home";
import * as homeAction from '../actions/home';
import { bindActionCreators } from 'redux';


const mapStateToProps = state => {
  return {
    signIn: state.homeReducer.signIn
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    homeAction: bindActionCreators(homeAction, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Home);