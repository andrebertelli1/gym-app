import { Metadata } from "next"
import { UserLoginForm } from "./components/user-login-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function SignIn() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-6 w-80">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="space-y-4">
          <UserLoginForm />
        </div>
      </div>
    </div>
  )
}