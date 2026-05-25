import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GUEST_LIST_ACCESS_COOKIE, hasGuestListAccessCookie } from '@/lib/guest-list-access'

type RsvpPayload = {
    guest_name?: string
    email?: string | null
    starter?: string | null
    entree?: string
    sides?: string[]
    bbq_preference?: boolean
}

function serializeRsvp(rsvp: {
    id: string
    guestName: string
    email: string | null
    starter: string | null
    entree: string
    sides: string
    bbqPreference: boolean
    createdAt: Date
}) {
    return {
        id: rsvp.id,
        guest_name: rsvp.guestName,
        email: rsvp.email,
        starter: rsvp.starter,
        entree: rsvp.entree,
        sides: JSON.parse(rsvp.sides) as string[],
        bbq_preference: rsvp.bbqPreference,
        created_at: rsvp.createdAt.toISOString(),
    }
}

export async function GET() {
    const cookieStore = await cookies()

    if (!hasGuestListAccessCookie(cookieStore.get(GUEST_LIST_ACCESS_COOKIE)?.value)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Retry wrapper for transient DB errors
    async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseDelay = 200): Promise<T> {
        let lastErr: unknown
        for (let i = 0; i < attempts; i++) {
            try {
                return await fn()
            } catch (err) {
                lastErr = err
                // eslint-disable-next-line no-console
                console.error(`[rsvps] Attempt ${i + 1} failed:`, err)
                if (i < attempts - 1) {
                    const delay = baseDelay * Math.pow(2, i)
                    // small backoff
                    // eslint-disable-next-line no-await-in-loop
                    await new Promise((r) => setTimeout(r, delay))
                }
            }
        }

        // All attempts failed
        throw lastErr
    }

    try {
        const rsvps = await withRetry(() => prisma.rsvp.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        }))

        return NextResponse.json(rsvps.map(serializeRsvp))
    } catch (error: unknown) {
        // Diagnostics for Prisma errors
        // eslint-disable-next-line no-console
        console.error('[rsvps] Failed to load RSVPs after retries:', error)

        // If Prisma supplies a client init error, surface a friendly message
        const isPrismaInitError = (error as any)?.name === 'PrismaClientInitializationError' ||
            (error as any)?.message?.includes?.("Can't reach database")

        if (isPrismaInitError) {
            return NextResponse.json({ error: 'Service unavailable. Please try again later.' }, { status: 503 })
        }

        return NextResponse.json({ error: 'Failed to load RSVPs' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const body = (await request.json()) as RsvpPayload
    const guestName = body.guest_name?.trim()
    const email = body.email?.trim() || null
    const starter = body.starter?.trim() || null
    const entree = body.entree?.trim()
    const sides = Array.isArray(body.sides) ? body.sides.slice(0, 2) : []
    const bbqPreference = Boolean(body.bbq_preference)

    if (!guestName) {
        return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }

    if (!entree) {
        return NextResponse.json({ error: 'Please select an entrée.' }, { status: 400 })
    }

    try {
        const rsvp = await prisma.rsvp.create({
            data: {
                guestName,
                email,
                starter,
                entree,
                sides: JSON.stringify(sides),
                bbqPreference,
            },
        })

        return NextResponse.json(serializeRsvp(rsvp), { status: 201 })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json(
                { error: 'This name has already been used for an RSVP. Please use a different name.' },
                { status: 409 },
            )
        }

        return NextResponse.json(
            { error: 'Failed to submit RSVP. Please try again.' },
            { status: 500 },
        )
    }
}