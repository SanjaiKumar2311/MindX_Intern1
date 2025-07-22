import axiosInstance from "@/lib/axiosInstance";
import { Message } from "../types/chat";

export const sendTestMessage = async(data: Message) => {
    try{        
        const response = await axiosInstance.post(`/chat/test`,data);
        console.log("Response",response.data);        
        return response.data;
    } catch(error){
        console.error("Error fetching conversations:", error);
        return null;        
    }
}