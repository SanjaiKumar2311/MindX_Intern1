import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface User {
    id: string;
    name: string;
    email: string;    
}

interface AuthContextType {
    user: User | null;
    tenantId: string | null;
    token: string | null;    
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authenticateWithToken: (accessToken: string) => void;
}

interface DecodedToken {
    sub: string;
    userId:string;
    name: string;
    email: string;
    tenantId: string;
    exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const storeAuth = (token: string, tenantId: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tenantId", tenantId);
    localStorage.setItem("userId",userId)
};

const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tenantId");
};

const getStoreAuth = () => {
    return {
        token: localStorage.getItem("token"),
        tenantId: localStorage.getItem("tenantId"),
    };
};

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);

    const isAuthenticated = !!user;

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password
            });

            const {accessToken} = response.data;

            const decoded : DecodedToken = jwtDecode(accessToken);

            const extractedTenantId = decoded.tenantId;

            const extractedUser: User = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,                
            };

            setToken(accessToken);
            setUser(extractedUser);
            setTenantId(extractedTenantId);

            storeAuth(accessToken, extractedTenantId,decoded.userId);
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const authenticateWithToken = (accessToken: string) => {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) throw new Error("Token expired");
      
        console.log(decoded);
        
        const extractedUser: User = {
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
        };
      
        const extractedTenantId = decoded.tenantId;
      
        setToken(accessToken);
        setUser(extractedUser);
        setTenantId(extractedTenantId);
      
        storeAuth(accessToken, extractedTenantId,decoded.userId);
      };

    const logout = () => {
        
        setUser(null);
        setToken(null);
        setTenantId(null);
        clearAuth();
    }

    useEffect(() => {
      const {token, tenantId} = getStoreAuth();
      if(token && tenantId) {
        try{
            const decoded : DecodedToken = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            if(decoded.exp < now) throw new Error("Token expired");

            const extractedUser: User = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
            };

            setToken(token);
            setUser(extractedUser);
            setTenantId(tenantId);            
        } catch(e) {
            logout();
        }
      }
    }, []);

    return (
        <AuthContext.Provider value={{user, token, tenantId, isAuthenticated, login, logout, authenticateWithToken}}>
            {children}
        </AuthContext.Provider>
    );  
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}