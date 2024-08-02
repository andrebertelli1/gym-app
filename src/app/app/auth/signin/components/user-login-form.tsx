"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, Home, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)

  const [loginError, setLoginError] = useState('')

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);

    toast({
      title: 'Email sent',
      description: 'An email has been sent to your email address with a link to reset your password.'
    })
  };

  const logIn = async (email: string, password: string) => {
    setLoginError('');
    try {
      const result = await signIn('credentials', { email, password, redirect: false, callbackUrl: '/' })

      if (result?.error) {
        setLoginError(result.error);
      } else {
        router.push('/');
      }

    } catch (error) {
      setLoginError('Unexpected error occurred.');
      console.error("Erro ao cadastrar e logar:", error);
    }
  };

  function openPassword() {
    setIsPasswordOpen(true);
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 space-y-2">
          {loginError != "" && (
            <label className="text-red-700">Incorrect email or password.</label>
          )}
          <div className="grid gap-1 space-y-1">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoCorrect="off"
              disabled={isLoading}
              className="h-[52px]"
            />
          </div>

          {isPasswordOpen ? (
            <div className="flex flex-col space-y-4">
              <div className="grid gap-1 space-y-1">
                <Label htmlFor="password">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-[52px]"
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <Button onClick={() => resetEmail()} className="w-32 cursor-pointer p-0 b-0 bg-transparent text-sm text-blue-500 hover:text-blue-600 hover:bg-transparent">Forgot password?</Button>
              <Button
                className="h-[52px]"
                onClick={() => logIn(email, password)}
                disabled={isLoading || !email || !password}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 items-center">
              <Button
                className="h-[52px] w-full"
                onClick={openPassword}
                disabled={isLoading || !email}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Don&apos;t have an account?<Link className="ml-2 text-white" href="/auth/signup">Sign up</Link></p>
            </div>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      Login Social
    </div>
  )
}