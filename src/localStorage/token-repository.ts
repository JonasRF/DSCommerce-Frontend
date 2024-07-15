import { TOKEN_PASSWORD } from "../utils/system";

export function save(token: string) {
    localStorage.setItem(TOKEN_PASSWORD, token);
}

export function get() : string | null {
    return localStorage.getItem(TOKEN_PASSWORD);
}

export function remove() {
    localStorage.removeItem(TOKEN_PASSWORD);
}