"use client"

import { useEffect, useState } from "react"

import { setCookie } from 'cookies-next';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [showPasswordError, setShowPasswordError] = useState(false)
  const [characterError, setCharacterError] = useState(false)
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)

  const signUp = async (email: string, password: string) => {
    if (password !== confirmPassword) {
      setShowPasswordError(true)
      setCharacterError(false)
      return
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setShowPasswordError(false)
      setCharacterError(true)
      return
    }
    if (emailAlreadyUsed) {
      setShowPasswordError(false)
      setCharacterError(false)
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setCookie('onboarding', 'true', { maxAge: 300 });

      await signIn('credentials', { email, password, redirect: true, callbackUrl: '/auth/onboarding' });
    } catch (error) {
      setEmailAlreadyUsed(true)
      console.error("Erro ao cadastrar e logar:", error);
    }
  };

  useEffect(() => {
    setEmailAlreadyUsed(false)
  }, [email])

  function openPassword() {
    setIsPasswordOpen(true);
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if (!showPasswordError && !characterError) {
      setIsLoading(true)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 space-y-2">
          {showPasswordError && (
            <label className="text-red-700">Passwords don&apos;t match.</label>
          )}
          {emailAlreadyUsed && (
            <label className="text-red-700">This email is already in use.</label>
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
                <span className={cn("text-xs", characterError ? "text-red-700" : "text-zinc-500")}>Password must contain at least 6 characters.</span>
              </div>
              <div className="grid gap-1 space-y-1">
                <Label htmlFor="confirmPassword">
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-[52px]"
                />
                <span className={cn("text-xs", characterError ? "text-red-700" : "text-zinc-500")}>Password must contain at least 6 characters.</span>
              </div>
              <Button
                onClick={() => signUp(email, password)}
                disabled={isLoading || (!email || !password || !confirmPassword)}
                className="h-[52px]"
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </div>
          ) : (
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
          )}
          <div className="flex justify-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Already have an account?<Link className="ml-2 text-white" href="/auth/signin">Log in</Link></p>
          </div>
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