import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import React, { useState } from 'react';
import { useRegister } from '../service/authService';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_AUTH_URL } from '@/config/config';

const RegisterForm = ({ className,...props}: React.ComponentPropsWithoutRef<"form">) => {

  const navigate = useNavigate();
  const {register, loading} = useRegister();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
    phoneNumber: '',    
  });
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {      
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!form.firstName) errors.firstName = 'First name is required'
    if (!form.lastName) errors.lastName = 'Last name is required'
    if (!form.email) errors.email = 'Email is required'
    if (!form.organizationName) errors.organizationName = 'Company name is required'
    if (!form.password) errors.password = 'Password is required'
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    const errors = validate();
    if(Object.keys(errors).length > 0){
      setFieldErrors(errors);
      return;
    }
    try{
      await register(form);
      navigate(`/verfiy-user?email=${form.email}`);
    } catch (err) {      
      console.log(err);
      
      toast("Registration failed", {         
        description: `${err}`,        
      });
    }
    
  };

  return (
    
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">Start your 30-day free trail. Cancel anytime.</p>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2 md:grid-cols-2">     
          <div>
            <Input 
              name="firstName" 
              type="text" 
              placeholder="First Name" 
              onChange={handleChange} 
              value={form.firstName} 
              className={clsx('focus-visible:ring-transparent  focus:ring-transparen',
                {'border-red-500 focus:border-red-500': fieldErrors.firstName,})}
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
              className={clsx('focus-visible:ring-transparent  focus:ring-transparen',
                {'border-red-500 focus:border-red-500': fieldErrors.lastName,})}
             />
            {fieldErrors.lastName && (<p className="text-sm text-red-500 mt-1">{fieldErrors.lastName}</p>)}
          </div>                         
        </div>  
        <div>
          <Input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            className={clsx('focus-visible:ring-transparent focus:ring-transparen',
              {'border-red-500 focus:border-red-500': fieldErrors.email,})}
          />
          {fieldErrors.email && (<p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>)}
        </div>        
        <div>
          <Input 
            name="organizationName" 
            type="text" 
            placeholder="Company Name" 
            onChange={handleChange} 
            className={clsx('focus-visible:ring-transparent  focus:ring-transparen',
              {'border-red-500 focus:border-red-500': fieldErrors.organizationName,})}
          />
          {fieldErrors.organizationName && (<p className="text-sm text-red-500 mt-1">{fieldErrors.organizationName}</p>)}
        </div>        
        <div>
          <Input 
            name="phoneNumber" 
            type="text" 
            placeholder="Phone Number" 
            onChange={handleChange} 
            value={form.phoneNumber}
            className={clsx('focus-visible:ring-transparent  focus:ring-transparen',
              {'border-red-500 focus:border-red-500': fieldErrors.phoneNumber,})}
          />
          {fieldErrors.phoneNumber && (<p className="text-sm text-red-500 mt-1">{fieldErrors.phoneNumber}</p>)}
        </div>        
        <div>
          <Input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            value={form.password}
            className={clsx('focus-visible:ring-transparent  focus:ring-transparen',
              {'border-red-500 focus:border-red-500': fieldErrors.password,})}
          />
          {fieldErrors.password && (<p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>)}
        </div>        
        
        <Button type="submit" className="w-full" disabled={loading}>
           Create account
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full"  onClick={() => window.location.href = GOOGLE_AUTH_URL}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
          Signup with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        {/* Don&apos;t have an account?{" "} */}
        Already have an account?
        <a href="#" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  )
}

export default RegisterForm