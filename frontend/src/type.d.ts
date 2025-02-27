interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T | null | any;
}

interface User {
    refreshToken: string;
    accessToken: string;
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    role: "user" | "admin";
    walletBalance: number;
    currency: string;
}