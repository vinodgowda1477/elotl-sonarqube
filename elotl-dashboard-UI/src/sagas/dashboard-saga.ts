import { put, takeLatest, call } from 'redux-saga/effects';
import {dashboardActionTypes} from '../constants/navigator-constants/dashboardConstants';
import {GET} from '../constants/api';
import {Endpoints} from '../constants/endpoints';

function* getClusterListing() {
    try {
        const url = Endpoints.CLUSTER;
        const results = yield call(GET, url);
        yield put({
            type: dashboardActionTypes.GET_CLUSTER_LIST_SUCCESS,
            results
        });
    } catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });     
    }
}

function* getClusterDetails(action:any){
    try{
        const url = Endpoints.CLUSTER + "/" + action.clusterId;
        const results = yield call(GET, url);
        yield put({
            type:dashboardActionTypes.GET_CLUSTER_DETAILS_SUCCESS,
            results
        });
    }catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });
    }
}

function* getNamespaceLists(action:any) {
    try {
        const url = Endpoints.CLUSTER + "/" + action.clusterId + Endpoints.NAMESPACES;
        const results = yield call(GET, url);
        yield put({
            type: dashboardActionTypes.GET_NAMESPACE_LIST_SUCCESS,
            results
        });
    } catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });
    }
}

function* getNamespaceDetails(action:any) {
    try {
        const url = Endpoints.CLUSTER + "/" + action.clusterId + Endpoints.NAMESPACES + "/" + action.namespaceId;
        const results = yield call(GET, url);
        yield put({
            type: dashboardActionTypes.GET_NAMESPACE_DETAILS_SUCCESS,
            results
        });
    } catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });
    }
}

function* getDeploymentList(action:any) {
    try {
        const url = Endpoints.CLUSTER + "/" + action.clusterId + Endpoints.NAMESPACES + "/" + action.namespaceId + Endpoints.DEPLOYMENTS;
        const results = yield call(GET, url);
        yield put({
            type: dashboardActionTypes.GET_DEPLOYMENT_LIST_SUCCESS,
            results
        });
    } catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });
    }
}

function* getDeploymentDetails(action:any) {
    try {
        const url = Endpoints.CLUSTER + "/" + action.clusterId + Endpoints.NAMESPACES + "/" + action.namespaceId + Endpoints.DEPLOYMENTS + "/" + action.deploymentId;
        const results = yield call(GET, url);
        yield put({
            type: dashboardActionTypes.GET_DEPLOYMENT_DETAILS_SUCCESS,
            results
        });
    } catch (error) {
        yield put({
            type: dashboardActionTypes.ERROR,
            error
        });
    }
}


function* dashboardSaga() {
    yield takeLatest(dashboardActionTypes.GET_CLUSTER_LIST, getClusterListing);
    yield takeLatest(dashboardActionTypes.GET_CLUSTER_DETAILS, getClusterDetails);
    yield takeLatest(dashboardActionTypes.GET_NAMESPACE_LIST, getNamespaceLists);
    yield takeLatest(dashboardActionTypes.GET_NAMESPACE_DETAILS, getNamespaceDetails);
    yield takeLatest(dashboardActionTypes.GET_DEPLOYMENT_LIST, getDeploymentList);
    yield takeLatest(dashboardActionTypes.GET_DEPLOYMENT_DETAILS, getDeploymentDetails);
}

export default dashboardSaga;