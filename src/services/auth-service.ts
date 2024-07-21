import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from '../localStorage/access-token-repository';
import * as tokenRepository from '../localStorage/token-repository';
import { RecoveryDTO, PasswordDTO } from "../models/recovery";
import jwtDecode from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

    const config: AxiosRequestConfig = {
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

    const requestBody = QueryString.parse({ ...loginData });

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/auth/recover-token",
        data: requestBody,
        headers
    }
    return requestBackend(config);
}

 export function recoveryPassword(loginData: PasswordDTO, token: string) {

    const headers = {
        "Content-Type": "application/json",
    }

    const requestBody = QueryString.parse({ ...loginData, token });

    const config: AxiosRequestConfig = {
        method: "PUT",
        url: "/auth/new-password",
        data: requestBody,
        headers
    }
    return requestBackend(config);
}

///////////////////////// ACCESS_TOKEN_REPOSITORY////////////////////////////////
export function logout() {
    accessTokenRepository.remove();
}

export function saveAccessToken(token: string) {
    accessTokenRepository.save(token);
}

export function getAccessToken() {
    return accessTokenRepository.get();
}
/////////////////////////////// TOKEN_PASSWORD  /////////////////////////////////
export function tokenPasswordLogout(){
    return tokenRepository.remove();
}

export function saveTokenPassword(token: string) {
    return tokenRepository.save(token);
}

export function getTokenPassword() {
     return tokenRepository.get(); 
}
/////////////////////////////////////////////////////////////////////////////////
export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
    try {
        const token = accessTokenRepository.get();
        return token == null ? undefined : (jwtDecode(token) as AccessTokenPayloadDTO);
    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(): boolean {
    let tokenPayload = getAccessTokenPayload();
    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}

export function hasAnyHoles(roles: RoleEnum[]) : boolean {
    if( roles.length === 0) {
        return true;
    }

    const tokenPayload = getAccessTokenPayload();

     if(tokenPayload !== undefined) {
        for(var i = 0; i < roles.length; i++) {
            if(tokenPayload.authorities.includes(roles[i])) {
                return true;
            }
        }
     }
     return false;
}