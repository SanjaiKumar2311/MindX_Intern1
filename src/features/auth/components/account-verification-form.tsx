import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useVerifyUser } from '../service/authService'
import { toast } from 'sonner'

const AccountVerificationForm = ({ className,...props}: React.ComponentPropsWithoutRef<"form">) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const {verifyUser, loading}= useVerifyUser();
  const [token, setToken] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (token.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      await verifyUser(token);
      toast.success("Verified successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verification Code</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter the verification code we've sent to your <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="grid gap-3">
      <div className="grid gap-2">
      <div className="flex justify-center">
      <InputOTP 
        maxLength={6} 
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS} 
        className='w-full max-w-sm justify-center'
        value={token}
        onChange={(value) => setToken(value)}
      >
      <InputOTPGroup>
        {[...Array(6)].map((_,i) => (
          <InputOTPSlot key={i} index={i} className="h-10 w-10 text-xl"/>    
        ))}
      </InputOTPGroup>
    </InputOTP> 
    </div>
    </div>

        
        <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
          Confirm
        </Button>
        
      </div>
      <div className="text-center text-sm">
        {/* Don&apos;t have an account?{" "} */}
        Didn't receive the code? 
        <a href="#" className="underline underline-offset-4">
          Resend
        </a>
      </div>
    </form>
  )
}

export default AccountVerificationForm