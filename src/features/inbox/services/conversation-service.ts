import axiosInstance from "@/lib/axiosInstance";
import { MessageInput } from "../types/conversation";

export const getConversations = async (params: Record<string, any> = {}) => {
    try {
        console.log("API Params:", params);
        const response = await axiosInstance.get(`/conversations`, {params});
        console.log("Response", response.data);    
        return response.data.data.content;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
};

export const getConversation = async (conversationId: string) => {
  try {
    console.log("APi called");
    const response = await axiosInstance.get(
      `/conversations/${conversationId}`
    );
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const sendUserMessage = async (data: MessageInput) => {
  try {
    console.log("APi called");
    const response = await axiosInstance.post(`/chat/send`, data);
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return null;
  }
};

export const assignConversation = async (conversationId: string,userId: string) => {
  try {
    console.log("APi called");
    const response = await axiosInstance.post(`/conversations/assign`, null,{
        params:{
            conversationId: conversationId,
            userId: userId,
        }
    });
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
