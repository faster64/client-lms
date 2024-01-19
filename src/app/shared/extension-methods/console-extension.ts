interface Console {
    success(message: any): void;
    customize(message?: any, ...options: any[]): void;
    warning(message?: any, ...options: any[]): void;
    err(message?: any, ...options: any[]): void;
}