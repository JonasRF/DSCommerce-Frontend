import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from '../localStorage/access-token-repository';
import { RecoveryDTO } from "../models/recovery";

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    const requestBody = QueryString.stringify({...loginData, grant_type: "password" });

    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/oauth2/token",
        data: requestBody,
        headers
    }
       return requestBackend(config);
}

export function recoveryLogin(loginData: RecoveryDTO) {

    const headers = {
        "Content-Type": "application/json",
    }

    const requestBody = QueryString.parse({...loginData});

    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/auth/recover-token",
        data: requestBody,
        headers
    }
       return requestBackend(config);
}

export function logout() {
    accessTokenRepository.remove();
}

export function saveAccessToken(token : string) {
    accessTokenRepository.save(token);
}

export function getAccessToken() {
    return accessTokenRepository.get();
}