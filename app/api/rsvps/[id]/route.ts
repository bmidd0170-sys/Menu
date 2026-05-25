import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { GUEST_LIST_ACCESS_COOKIE, hasGuestListAccessCookie } from '@/lib/guest-list-access'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!hasGuestListAccessCookie(cookieStore.get(GUEST_LIST_ACCESS_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let id = params?.id

  if (!id) {
    try {
      const url = new URL(request.url)
      id = decodeURIComponent(url.pathname.split('/').pop() || '')
    } catch (e) {
      // ignore
    }
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    await prisma.rsvp.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[rsvps:id] Delete error', { id, err })
    return NextResponse.json({ error: 'Failed to delete RSVP' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!hasGuestListAccessCookie(cookieStore.get(GUEST_LIST_ACCESS_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null

  if (!body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const data: any = {}
  if (typeof body.guest_name === 'string') data.guestName = body.guest_name.trim()
  if (typeof body.email === 'string') data.email = body.email.trim() || null
  if (typeof body.starter === 'string') data.starter = body.starter || null
  if (typeof body.entree === 'string') data.entree = body.entree
  if (Array.isArray(body.sides)) data.sides = JSON.stringify((body.sides as string[]).slice(0, 2))

  try {
    const updated = await prisma.rsvp.update({ where: { id }, data })
    return NextResponse.json({ ok: true, rsvp: {
      id: updated.id,
      guest_name: updated.guestName,
      email: updated.email,
      starter: updated.starter,
      entree: updated.entree,
      sides: JSON.parse(updated.sides),
      created_at: updated.createdAt.toISOString(),
    }})
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[rsvps:id] Patch error', err)
    return NextResponse.json({ error: 'Failed to update RSVP' }, { status: 500 })
  }
}
