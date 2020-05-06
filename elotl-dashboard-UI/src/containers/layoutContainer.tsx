import { connect } from "react-redux";
import Layout from "../components/layout/layout";

const mapStateToProps = state => {
    return {
      signIn: state.homeReducer.signIn,
      error: state.dashboardReducer.error
    };
  };
  
export default connect(
mapStateToProps,
)(Layout);