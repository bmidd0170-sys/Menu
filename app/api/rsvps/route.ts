import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

type RsvpPayload = {
  guest_name?: string
  email?: string | null
  starter?: string | null
  entree?: string
  sides?: string[]
}

function serializeRsvp(rsvp: {
  id: string
  guestName: string
  email: string | null
  starter: string | null
  entree: string
  sides: string
  createdAt: Date
}) {
  return {
    id: rsvp.id,
    guest_name: rsvp.guestName,
    email: rsvp.email,
    starter: rsvp.starter,
    entree: rsvp.entree,
    sides: JSON.parse(rsvp.sides) as string[],
    created_at: rsvp.createdAt.toISOString(),
  }
}

export async function GET() {
  const rsvps = await prisma.rsvp.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  return NextResponse.json(rsvps.map(serializeRsvp))
}

export async function POST(request: Request) {
  const body = (await request.json()) as RsvpPayload
  const guestName = body.guest_name?.trim()
  const email = body.email?.trim() || null
  const starter = body.starter?.trim() || null
  const entree = body.entree?.trim()
  const sides = Array.isArray(body.sides) ? body.sides.slice(0, 2) : []

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