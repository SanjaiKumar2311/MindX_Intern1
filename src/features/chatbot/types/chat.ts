export interface Message {
    session_id: string | null;
    message: string;
    model: string;
    role: string;
}