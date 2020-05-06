import Axios from 'axios';

const mock = false;

const fetchData = async (method:any, url: string, params: any,
    data: any, getPlainData?: boolean) => {
    let headers = {};
    if (!mock) {
        const idToken = localStorage.getItem('id_token');
        headers = {
            Authorization: `Bearer ${idToken}`
        };
    } 
    
    const response = await Axios({
        method,
        url,
        params,
        data,
        headers
    });

    return getPlainData ? response.data : response.data;
}

export const GET = async (url: string, params?: any, getPlainData?: boolean) => {
    return fetchData(
        'GET',
        url,
        params,
        null,
        getPlainData
    );
}
export const POST = async (url: string, data?: any, queryParam?: any) => {
    return fetchData(
        'POST',
        url,
        queryParam,
        data
    );
}
export const PUT = async (url: string, data?: any, queryParam?: any) => {
    return fetchData(
        'PUT',
        url,
        queryParam,
        data
    );
}
export const PATCH = async (url: string, data?: any, queryParam?: any) => {
    return fetchData(
        'PATCH',
        url,
        queryParam,
        data
    );
}
export const DELETE = async (url: string, params?: any, queryParams?: any) => {
    return fetchData(
        'DELETE',
        url,
        queryParams,
        params
    );
}

export const replaceUrlVariables =
    (varUrl: string, searchValue: string, replaceValue: string): string =>
        varUrl.replace(searchValue, replaceValue);
