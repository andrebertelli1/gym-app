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
  const router = useRouter();

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
            />
          </div>
          <div className="grid gap-1 space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">
                Password
              </Label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">Forgot password?</Link>
            </div>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={() => signIn('credentials', { email, password, redirect: true, callbackUrl: '/' })}
            disabled={isLoading || !email || !password}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
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
      <Button onClick={() => router.push('signup')} variant="outline" type="button" disabled={isLoading}>
        Sign up
      </Button>
    </div>
  )
}