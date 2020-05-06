import { dashboardActionTypes } from "../constants/navigator-constants/dashboardConstants";

 const initialState = {
    selectedCluster:"",
    selectedNamespace:"",
    selectedDeployment:"",
    clusterList:[],
    clusterDetails:[],
    namespaceList:[],
    namespaceDetails:[],
    deploymentList:[],
    deploymentDetails:{},
    error:undefined
 }
 const dashboardReducer = (state=initialState, action)=>{
    switch (action.type) {
        case dashboardActionTypes.GET_SELECTED_CLUSTER:
            return {...state, selectedCluster:action.selectedCluster}
        case dashboardActionTypes.GET_SELECTED_NAMESPACE:
            return {...state, selectedNamespace:action.selectedNamespace}
        case dashboardActionTypes.GET_SELECTED_DEPLOYMENT:
            return {...state, selectedDeployment:action.selectedDeployment}
        case dashboardActionTypes.GET_CLUSTER_LIST_SUCCESS:
            return {...state, clusterList:action.results}
        case dashboardActionTypes.GET_CLUSTER_DETAILS_SUCCESS:
            return {...state, clusterDetails:action.results}
        case dashboardActionTypes.GET_NAMESPACE_LIST_SUCCESS:
            return {...state, namespaceList:action.results}
        case dashboardActionTypes.GET_NAMESPACE_DETAILS_SUCCESS:
            return {...state, namespaceDetails:action.results}
        case dashboardActionTypes.GET_DEPLOYMENT_LIST_SUCCESS:
            return {...state, deploymentList:action.results}
        case dashboardActionTypes.GET_DEPLOYMENT_DETAILS_SUCCESS:
            return {...state, deploymentDetails:action.results}
        case dashboardActionTypes.ERROR:
            return {...state, error:action.error}
        case dashboardActionTypes.ERROR_RESET:
            return {...state, error:undefined}
        default:
            return state;
    }
 }

 export default dashboardReducer;