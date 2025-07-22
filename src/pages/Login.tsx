import { LoginForm } from '@/features/auth/components'
import { useTitle } from '@/hooks/use-title'

const Login = () => {
  useTitle("MindX Service AI | The easiest way to see and talk to your users");
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login