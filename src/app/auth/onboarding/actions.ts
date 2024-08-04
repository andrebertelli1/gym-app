'use server'

import { prisma } from '@/services/database'
import { z } from 'zod'
import { upsertOnboardingSchema } from './schema'

export async function upsertOnboarding(input: z.infer<typeof upsertOnboardingSchema>) {
  console.log('input: ', input)
  const user = await prisma.user.create({
    data: {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      birth_date: input.birth_date,
      firebaseUid: input.firebaseUid
    },
  })

  return user
}