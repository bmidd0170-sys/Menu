import { NextResponse } from 'next/server'
import {
  GUEST_LIST_ACCESS_COOKIE,
  getGuestListAccessCookieValue,
  isGuestListAccessConfigured,
  isValidGuestListCode,
} from '@/lib/guest-list-access'

const GUEST_LIST_ACCESS_MAX_AGE = 60 * 60 * 72

type AccessPayload = {
  code?: string
}

export async function POST(request: Request) {
  if (!isGuestListAccessConfigured()) {
    return NextResponse.json({ error: 'Guest list access is not configured.' }, { status: 500 })
  }

  const body = (await request.json().catch(() => null)) as AccessPayload | null
  const code = body?.code?.trim() ?? ''

  if (!code) {
    return NextResponse.json({ error: 'Please enter an access code.' }, { status: 400 })
  }

  if (!isValidGuestListCode(code)) {
    return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })
  }

  const cookieValue = getGuestListAccessCookieValue()

  if (!cookieValue) {
    return NextResponse.json({ error: 'Guest list access is not configured.' }, { status: 500 })
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.set(GUEST_LIST_ACCESS_COOKIE, cookieValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: GUEST_LIST_ACCESS_MAX_AGE,
  })

  return response
}