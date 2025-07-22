import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

interface Persona  {
    id?: string;
    agentName: string,
    companyName: string,
    companyDescription: string,
    tone: string,
    messageLength: string,
    allowEmoji: boolean,    
  }


export const usePersonaService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    

    const createPersona = async (data: Persona) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/persona", data);
            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create persona";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updatePersona= async (data: Persona) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.put(`/persona`, data);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update persona";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const getPersona = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/persona`);
            return res.data.data;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to get persona";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createPersona,
        updatePersona,
        getPersona
    }
}