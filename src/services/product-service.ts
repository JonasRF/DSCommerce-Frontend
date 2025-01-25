/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { ProductDTO } from "../models/product";

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            name,
            size,
            sort
        }
    }
    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/products/${id}` })
}

export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/products/${id}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function updateRequest(data: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/products/${data.id}`,
        data,
        withCredentials: true
    }
    return requestBackend(config);
}

export function insertRequest(data: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/products",
        data,
        withCredentials: true
    }
    return requestBackend(config);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function uploadImage(file: File, _onUploadProgress: (progressEvent: ProgressEvent) => void) {   
    const formData = new FormData();
    formData.append("file", file);
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/products/image",
        data: formData,
        withCredentials: true
    }
    return requestBackend(config);
}