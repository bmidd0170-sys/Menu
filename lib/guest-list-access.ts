import { createHmac, timingSafeEqual } from 'node:crypto'

export const GUEST_LIST_ACCESS_COOKIE = 'guest_list_access'
const GUEST_LIST_ACCESS_PURPOSE = 'guest-list-access'
const GUEST_LIST_ACCESS_SECRET = process.env.GUEST_LIST_ACCESS_CODE

function getAccessToken(secret: string) {
  return createHmac('sha256', secret).update(GUEST_LIST_ACCESS_PURPOSE).digest('base64url')
}

export function isGuestListAccessConfigured() {
  return Boolean(GUEST_LIST_ACCESS_SECRET)
}

export function isValidGuestListCode(code: string) {
  if (!GUEST_LIST_ACCESS_SECRET) {
    return false
  }

  const provided = Buffer.from(code)
  const expected = Buffer.from(GUEST_LIST_ACCESS_SECRET)

  if (provided.length !== expected.length) {
    return false
  }

  return timingSafeEqual(provided, expected)
}

export function getGuestListAccessCookieValue() {
  if (!GUEST_LIST_ACCESS_SECRET) {
    return null
  }

  return getAccessToken(GUEST_LIST_ACCESS_SECRET)
}

export function hasGuestListAccessCookie(value?: string | null) {
  const expected = getGuestListAccessCookieValue()

  if (!expected || !value) {
    return false
  }

  const provided = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)

  if (provided.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(provided, expectedBuffer)
}
