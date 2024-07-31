"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const router = useRouter();

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
              <Link href="/auth/forgot-password" className="text-sm w-32 text-blue-500 hover:text-blue-600">
                Forgot password?
              </Link>
              <Button
                className="h-[52px]"
                onClick={() => signIn('credentials', { email, password, redirect: true, callbackUrl: '/' })}
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