"use client"

import { useState } from "react"

import { deleteCookie } from 'cookies-next';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { date, z } from 'zod'
import { upsertOnboardingSchema } from "../schema"
import { upsertOnboarding } from "../actions"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { format, parseISO } from 'date-fns';
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserOnboardingForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const session = useSession()
  console.log(session, "session")

  const form = useForm<z.infer<typeof upsertOnboardingSchema>>({
    resolver: zodResolver(upsertOnboardingSchema),
    defaultValues: {
      name: "",
      surname: "",
      birthDate: "",
      email: session.data?.user?.email || "",
      firebaseUid: session.data?.user?.id || "",
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)

    const dateObj = parseISO(data.birthDate);
    const formattedDate = dateObj.toISOString();

    const onboardingData = {
      name: data.name,
      surname: data.surname,
      email: session.data?.user?.email || '',
      birthDate: formattedDate,
      firebaseUid: session.data?.user?.id || '',
    }

    try {
      await upsertOnboarding(onboardingData)
      deleteCookie('onboarding')

      setTimeout(() => {
        setIsLoading(false)
        router.push("/")
      }, 3000)

    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2 space-y-2">
            <div className="grid gap-1 space-y-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="John"
                        type="text"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="h-[52px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input
                        id="surname"
                        placeholder="Doe"
                        type="text"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="h-[52px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display surname.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <Input
                        id="birthDate"
                        type="date"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="h-[52px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              // disabled={isLoading || !name || !surname}
              disabled={isLoading}
              className="h-[52px]"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </Form>

    </div>
  )
}