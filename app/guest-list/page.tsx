import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { RSVPTable } from '@/components/rsvp-table'
import { GuestListAccessForm } from '@/components/guest-list-access-form'
import { GUEST_LIST_ACCESS_COOKIE, hasGuestListAccessCookie } from '@/lib/guest-list-access'

export const metadata: Metadata = {
  title: 'Guest List Access',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function GuestListPage() {
  const cookieStore = await cookies()
  const hasAccess = hasGuestListAccessCookie(cookieStore.get(GUEST_LIST_ACCESS_COOKIE)?.value)

  return hasAccess ? <RSVPTable showActions={true} /> : <GuestListAccessForm />
}