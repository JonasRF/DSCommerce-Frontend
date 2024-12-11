import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findPageRequestCategories() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/categories",
    }
    return requestBackend(config);
}
