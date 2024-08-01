'use server'

import { prisma } from '@/services/database'
import { z } from 'zod'
import { upsertOnboardingSchema } from './schema'

export async function upsertOnboarding(input: z.infer<typeof upsertOnboardingSchema>) {
  console.log('input: ', input)
  const user = await prisma.user.create({
    data: {
      name: input.name,
      surname: input.surname,
      email: input.email,
      birthDate: input.birthDate,
      firebaseUid: input.firebaseUid
    },
  })

  return user
}