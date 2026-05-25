import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'] })

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

if (process.env.NODE_ENV === 'development') {
    try {
        // Lightweight initialization log to help diagnose connection issues in dev
        // Do not attempt to eagerly connect here; just note creation time.
        // This helps correlate runtime errors with client lifecycle.
        // eslint-disable-next-line no-console
        console.log(`[prisma] Prisma client initialized (${new Date().toISOString()})`)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[prisma] Error during Prisma client init logging', e)
    }
}