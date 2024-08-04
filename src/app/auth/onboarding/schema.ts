import { z } from 'zod'

export const upsertOnboardingSchema = z.object({
  id: z.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  birth_date: z.string(),
  firebaseUid: z.string()
})