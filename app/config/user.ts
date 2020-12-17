export interface User {
    userId?: number | string;
    name: string;
    email: string;
    password: string;
    iat?: number;
    images?: {}[];
    expoPushToken?: string; 
}