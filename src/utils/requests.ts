import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import { history } from "./history";
import * as authService from '../services/auth-service';

export function requestBackend(config: AxiosRequestConfig) {

    const headers = config.withCredentials
        ? {
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : config.headers;

    return axios({ ...config, baseURL: BASE_URL, headers });
}

//REQUEST INTERCEPTOR
axios.interceptors.request.use(
    function (config) {
        //Do something before request is sent
        return config
    },
    function (error) {

        //Do something with request error
        return Promise.reject(error);
    }
);

//RESPONSE INTERCEPTOR
axios.interceptors.response.use(
    function (response) {
        //Do something before request is sent
        return response;
    },
    function (error) {
        if(error.response.status === 401){
            history.push("/login");
        }
        if(error.response.status === 403){
            history.push("/catalog")
        }
        return Promise.reject(error);
    }
);
