import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

interface Action  {
    id?: string
    name: string
    description: string
    status: string
    httpMethod: string
    url: string
    headers: Header[]
    mockResponse: MockResponse
    inputs: Input[]
    responseFields: ResponseField[]     
  }

  interface Header {
    id: string
    name: string
    value: string

  }

  interface MockResponse {
    id: string
    body: string
  }

  interface Input {
    id: string
    name: string
    description: string
    type: string
    required: boolean
    defaultValue: string    
  }

  interface ResponseField {
    id: string
    responsePath: string
    description: string
    example: string
    value: string
  }


export const useActionService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const createAction = async (data: Action) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/actions", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updateAction = async (data: Action, articlesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.put(`/actions/${articlesId}`, data);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getActionById = async (articlesId: string | null) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/actions/${articlesId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getAllAction = async (queryParams: Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/actions",{
                params: queryParams,
            });
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const deleteAction = async (articlesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.delete(`/actions/${articlesId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const editAction = async (roleId: (string | number)) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/actions/edit",{
                params: {
                    roleId : roleId,
                },
            });
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createAction,
        updateAction,
        getActionById,
        getAllAction,
        deleteAction,
        editAction,
    }
}