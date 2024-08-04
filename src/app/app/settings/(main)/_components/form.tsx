import { Session } from "next-auth"

type SettingsFormProps = {
  defaultValues: Session['user']
}

export function SettingsForm(defaultValues: SettingsFormProps) {
  return (
    <h1>Form</h1>
  )
}