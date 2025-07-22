import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSetPassword, useVerifyInviteUser } from "../service/authService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SetPasswordForm = ({className,...props}: React.ComponentPropsWithoutRef<"form">) => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  console.log(token,"token");
  
  const { setPassword } = useSetPassword();
  const { verifyInviteUser } = useVerifyInviteUser();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.password.trim()) errors.password = "Password is required";
    if (!form.confirmPassword.trim()) errors.confirmPassword = "Confirm password is required";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    if (!token) {
        toast.error("Token is missing in URL");
        return;
      }
    try {
        setLoading(true);
        await setPassword(token, form);
        toast.success("Password set successfully");
        navigate("/");
    } catch (err) {
      console.log(err);
      toast("Password reset failed", { description: `${err}` });
    } finally {
        setLoading(false);
    }
  };

    const verify = async (token: string) => {
      console.log("method called");
      
        try {
          const res = await verifyInviteUser(token);
          console.log("res",res);
          if(res.showPasswordForm){          
            setShowForm(true);
            setForm((prev) =>({...prev, 
              firstName: res.firstName || '',
              lastName: res.lastName || '',              
            }))
          }
          
        } catch (err) {
          toast.error("Verification failed", { description: String(err) });
        }
      };
  

  useEffect(() => {      
    if (!token) {                  
        toast.error("Invalid or missing token");
        return;
      }            
    verify(token);
}, [token]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      {showForm && (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Set new password</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Must be atleast 8 characters.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2 md:grid-cols-2">     
                      <div>
                        <Input 
                          name="firstName" 
                          type="text" 
                          placeholder="First Name" 
                          onChange={handleChange} 
                          value={form.firstName}               
                         />
                        {fieldErrors.firstName && (<p className="text-sm text-red-500 mt-1">{fieldErrors.firstName}</p>)}
                      </div>
                      <div>            
                         <Input 
                          name="lastName" 
                          type="text" 
                          placeholder="Last Name" 
                          onChange={handleChange} 
                          value={form.lastName}
                         />
                        {fieldErrors.lastName && (<p className="text-sm text-red-500 mt-1">{fieldErrors.lastName}</p>)}
                      </div>                         
                    </div>  
            <div className="grid gap-2">
              
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder=""
                value={form.password}
                onChange={handleChange}
              />
              {fieldErrors.password && (<p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>)}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder=""
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {fieldErrors.confirmPassword && (<p className="text-sm text-red-500 mt-1">{fieldErrors.confirmPassword}</p>)}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              Activate
            </Button>
          </div>
        </>
      )}
      {!showForm && (
        <>
          <div className="text-center text-muted-foreground">Verifying invite link...</div>
        </>
      )}
    </form>
  );
};

export default SetPasswordForm;
