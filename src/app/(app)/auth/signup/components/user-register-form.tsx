"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Link from "next/link"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  function openPassword() {
    setIsPasswordOpen(true);
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 space-y-2">
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
                <Input
                  id="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-[52px]"
                />
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
              </div>
              <Button
                onClick={() => signUp()}
                disabled={isLoading || (!email || !password || !confirmPassword) || (password !== confirmPassword)}
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