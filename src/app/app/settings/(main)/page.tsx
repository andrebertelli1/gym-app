import { auth } from '@/services/auth'
import { SettingsForm } from './_components/form'

export default async function Page() {
  const session = await auth()

  return <SettingsForm defaultValues={session?.user} />
}
