import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { UserInput } from "../types/user";

export const useUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const inviteUser = async (data: UserInput) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/users/invite", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to invite user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (data: UserInput, userId: string | number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.put(`/users/${userId}`, data);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/users/${userId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getAllUser = async (queryParams: Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/users",{
                params: queryParams,
            });
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.delete(`/users/${userId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (userId: (string | number | null)) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/users/edit`,{
                params:{
                    userId: userId,
                },
            });
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const inviteUserAgainById = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/users/${userId}/invite-again`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to invite user";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        inviteUser,
        updateUser,
        getAllUser,
        getUserById,
        deleteUser,
        editUser,
        inviteUserAgainById,
    }
}