"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface UserForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserForgotPasswordForm({ className, ...props }: UserForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

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
          <Button
            onClick={() => resetEmail()}
            disabled={isLoading || !email}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}