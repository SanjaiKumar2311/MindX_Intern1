import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const OAauth2RedirectHandler = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {authenticateWithToken}= useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const error = params.get("error");
    
        if (error) {
          toast.error("Login failed", { description: error });
          navigate("/login"); // Optionally stay on /oauth2/redirect
        } else if (token) {
          // Save token (e.g., localStorage or context)
          authenticateWithToken(token);
        //   localStorage.setItem("accessToken", token);
          navigate("/"); // Redirect to your dashboard or homepage
        } else {
          navigate("/login");
        }
      }, [location, navigate]);

  return (null);
}

export default OAauth2RedirectHandler