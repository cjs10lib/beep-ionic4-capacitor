
export interface LoginResponse {
    result?: {
        uid?: string;
        email?: string;
    };
    error?: {
        code?: string;
        message?: string;
    };
}
