import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";


interface Article {
    id?: number;
    title: string;
    description: string;
    content: string;
    status: string;
}

interface ImportArticle {
    id?: number;
    url: string;
    additionalUrls: string[];
}

export const useArticleService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const createArticle = async (data: Article) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/articles", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const createArticleFromUpload = async (file:File) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        setLoading(true);
        setError(null);
        try {
            console.log(file);
            console.log(formData);

            const res = await axiosInstance.post("/articles/uploads", formData);            
            
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const createArticleFromWebsite = async (data: ImportArticle) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/articles/website", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updateArticle = async (data: Article, articlesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.put(`/articles/${articlesId}`, data);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getArticleById = async (articlesId: string | null) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/articles/${articlesId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getAllArticle = async (queryParams: Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/articles",{
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

    const deleteArticle = async (articlesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.delete(`/articles/${articlesId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const editArticle = async (roleId: (string | number)) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/articles/edit",{
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
        createArticle,
        createArticleFromWebsite,
        createArticleFromUpload,
        updateArticle,
        getArticleById,
        getAllArticle,
        deleteArticle,
        editArticle,
    }
}