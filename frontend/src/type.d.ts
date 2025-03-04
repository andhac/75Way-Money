interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T | null | any;
}

interface Transaction {
    senderId?: string;
    receiverId?: string;
    amount: number;
    _id: string;
    status: "pending" | "approved";
    currency: string;
    createdAt: string;
}

interface Wallet {
    _id: string;
    user: string;
    balance: number;
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