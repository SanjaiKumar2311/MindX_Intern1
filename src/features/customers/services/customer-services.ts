import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { CustomerInput } from "../types/customer";

export const useCustomerService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const createCustomer = async (data: CustomerInput) => {
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

    const updateCustomer = async (data: CustomerInput, userId: string | number) => {
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

    const getCustomerById = async (userId: number) => {
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

    const getAllCustomer = async (queryParams: Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/customers",{
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

    const deleteCustomer = async (userId: number) => {
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

    const editCustomer = async (userId: (string | number | null)) => {
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


    return {
        loading,
        error,
        createCustomer,
        updateCustomer,
        getAllCustomer,
        getCustomerById,
        deleteCustomer,
        editCustomer
    }
}