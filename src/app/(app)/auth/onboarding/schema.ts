import { z } from 'zod'

export const upsertOnboardingSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  birthDate: z.string(),
  firebaseUid: z.string()
})