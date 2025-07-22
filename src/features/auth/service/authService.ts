import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/hooks/use-auth";

interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    organizationName: string;
    phoneNumber: string;
    password: string;
}

interface LoginInput {
email: string;
password: string;
}

interface PasswordInput {
    password: string;
    confirmPassword: string;
}

export interface VerifyInviteResponse {
    showPasswordForm: boolean;
    firstName: string;
    lastName: string;
    email: string;
  }

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const register = async(data: RegisterInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axiosInstance.post("/auth/register", data);
            setSuccess(true);            
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);   
            throw new Error(message);          
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, success, register};
};

export const useLogin = () => {
    const {authenticateWithToken}= useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const login = async(data: LoginInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axiosInstance.post("/auth/login", data);
            const {accessToken} = response.data.data;
            authenticateWithToken(accessToken);
            setSuccess(true);            
        } catch (err: any) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);   
            throw new Error(message);          
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, success, login};
};

export const useVerifyUser = () => {
    const {authenticateWithToken}= useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const verifyUser = async(token: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axiosInstance.post("/auth/verify?token="+token );
            const {accessToken} = response.data.data;
            authenticateWithToken(accessToken);
            setSuccess(true);            
        } catch (err: any) {
            const message = err.response?.data?.message || "Verification failed";
            setError(message);   
            throw new Error(message);          
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, success, verifyUser};
};

export const useSetPassword = () => {
    const {authenticateWithToken}= useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const setPassword = async(token: string, data:PasswordInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axiosInstance.post(`/auth/${token}/activate`, data);
            const {accessToken} = response.data.data;
            authenticateWithToken(accessToken);
            setSuccess(true);            
        } catch (err: any) {
            const message = err.response?.data?.message || "Password Set failed";
            setError(message);   
            throw new Error(message);          
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, success, setPassword};
};

export const useVerifyInviteUser = () => {    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const verifyInviteUser = async(token: string): Promise<VerifyInviteResponse> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axiosInstance.post(`/auth/verify-invite-user?token=${token}`);
            // const {accessToken} = response.data.data;
            // authenticateWithToken(accessToken);
            setSuccess(true);   
            console.log(response.data);
            
            return response.data.data;         
        } catch (err: any) {
            const message = err.response?.data?.message || "Verification failed";
            setError(message);   
            throw new Error(message);          
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, success, verifyInviteUser};
};
