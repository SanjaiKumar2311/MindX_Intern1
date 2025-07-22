import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

interface MorePermission {
    id: number;
    permissionName: string;
    permissionFormatted: string;
    isEnabled: boolean;
}

export enum EntityType {
    USER = "USER",
    // add more as needed
}

export interface Permissions {
    id: number;    
    entityType: EntityType;
    canCreate: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    fullAccess: boolean;
    morePermissions: MorePermission[];
}

interface RoleInput {
    id?: number;
    name: string;
    description: string;
    permissions: Permissions[];
}

export const useRoleService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const createRole = async (data: RoleInput) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/roles", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (data: RoleInput, roleId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.put(`/roles/${roleId}`, data);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getRoleById = async (roleId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/roles/${roleId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getAllRole = async (queryParams: Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/roles",{
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

    const deleteRole = async (roleId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.delete(`/roles/${roleId}`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete role";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const editRole = async (roleId: (string | number)) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get("/roles/edit",{
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
        createRole,
        updateRole,
        getRoleById,
        getAllRole,
        deleteRole,
        editRole,
    }
}