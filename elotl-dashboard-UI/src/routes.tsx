import * as React from "react";
import { Route, Switch, Router } from "react-router-dom";
import Dashboard from "./containers/dashboardContainer";
import { baseRoutes } from "./constants/routes";
import Home from "./containers/homeContainer";
import ClusterDetails from "./containers/clusterDetailsContainer";
import DeploymentDetails from "./containers/deploymentDetailsContainer";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={baseRoutes.HOME} component={Home} />
                <Route path={baseRoutes.DASHBOARD} component={Dashboard} />
                <Route path={baseRoutes.DETAILPAGE} component={ClusterDetails} />
                <Route path={baseRoutes.DEPLOYMENT_DETAILS} component={DeploymentDetails} />
            </Switch>
        </Router>
    );
}

export default Routes;
