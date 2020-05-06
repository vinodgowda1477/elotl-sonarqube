import { dashboardActionTypes } from "../constants/navigator-constants/dashboardConstants";

export function getSelectedCluster(selectedCluster) {
    return {
      type: dashboardActionTypes.GET_SELECTED_CLUSTER,
      selectedCluster
    };
}

export function getSelectedNamespace(selectedNamespace) {
  return {
    type: dashboardActionTypes.GET_SELECTED_NAMESPACE,
    selectedNamespace
  };
}

export function getSelectedDeployment(selectedDeployment) {
  return {
    type: dashboardActionTypes.GET_SELECTED_DEPLOYMENT,
    selectedDeployment
  };
}

export function getClusterListing() {
    return {
      type: dashboardActionTypes.GET_CLUSTER_LIST
    }
}

export function getClusterDetails(clusterId){
    return{
      type: dashboardActionTypes.GET_CLUSTER_DETAILS,
      clusterId
    }
}

export function getNamespaceList(clusterId){
    return {
      type:dashboardActionTypes.GET_NAMESPACE_LIST,
      clusterId
    }
}

export function getNamespaceDetails(clusterId, namespaceId){
  return {
    type: dashboardActionTypes.GET_NAMESPACE_DETAILS,
    clusterId, 
    namespaceId
  }
}

export function getDeploymentList(clusterId, namespaceId){
   return {
      type:dashboardActionTypes.GET_DEPLOYMENT_LIST,
      clusterId,
      namespaceId
   }
}

export function getDeploymentDetails(clusterId, namespaceId, deploymentId){
  return {
    type:dashboardActionTypes.GET_DEPLOYMENT_DETAILS,
    clusterId,
    namespaceId,
    deploymentId
 }
}

export function resetError(){
  return {
    type:dashboardActionTypes.ERROR_RESET
  }
}

