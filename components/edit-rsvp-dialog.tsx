'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import menu from '@/data/menu'

type RSVP = {
  id: string
  guest_name: string
  email?: string | null
  starter?: string | null
  entree: string
  sides: string[]
  bbq_preference?: boolean
}

export function EditRsvpDialog({ rsvp, children }: { rsvp: RSVP; children: React.ReactNode }) {
  const starters = menu.starters
  const entrees = [...(menu.entrees || []), ...(menu.mains || [])]
  const sides = menu.sides
  const smokedChickenId = 'entree-smoked-chicken'

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(rsvp.guest_name)
  const [email, setEmail] = useState(rsvp.email || '')
  const [starter, setStarter] = useState<string | null>(rsvp.starter || null)
  const [entree, setEntree] = useState(rsvp.entree)
  const [selectedSides, setSelectedSides] = useState<string[]>(rsvp.sides || [])
  const [wantsBbq, setWantsBbq] = useState(Boolean(rsvp.bbq_preference))
  const [isSaving, setIsSaving] = useState(false)

  const toggleSide = (id: string) => {
    setSelectedSides((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 2 ? [...prev, id] : prev))
  }

  useEffect(() => {
    if (entree !== smokedChickenId) {
      setWantsBbq(false)
    }
  }, [entree])

  const handleSave = async () => {
    if (!name.trim()) return alert('Name is required')
    setIsSaving(true)

    try {
      const res = await fetch(`/api/rsvps/${rsvp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: name.trim(),
          email: email.trim() || null,
          starter: starter || null,
          entree,
          sides: selectedSides,
          bbq_preference: wantsBbq,
        }),
      })

      if (!res.ok) throw new Error('Save failed')

      window.dispatchEvent(new Event('rsvp-updated'))
      setOpen(false)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to save RSVP', e)
      alert('Failed to save RSVP')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit RSVP</DialogTitle>
          <DialogDescription>Update guest details and meal selections.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => {
                try {
                  const len = (e.currentTarget.value || '').length
                  e.currentTarget.setSelectionRange(len, len)
                } catch (err) {
                  // ignore if not supported
                }
              }}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email (optional)</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Starter</label>
            <Select value={starter ?? 'none'} onValueChange={(v: string) => setStarter(v === 'none' ? null : v)}>
              <SelectTrigger>
                <SelectValue placeholder="No starter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No starter</SelectItem>
                {starters.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Main Entree</label>
            <Select value={entree} onValueChange={(v: string) => setEntree(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a main entree" />
              </SelectTrigger>
              <SelectContent>
                {entrees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {entree === smokedChickenId && (
            <div>
              <p className="text-sm text-muted-foreground mb-2 block">BBQ preference</p>
              <Button
                type="button"
                variant={wantsBbq ? 'default' : 'outline'}
                onClick={() => setWantsBbq((prev) => !prev)}
              >
                {wantsBbq ? 'BBQ preferred' : 'Add BBQ preference'}
              </Button>
            </div>
          )}

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Sides (up to 2)</label>
            <div className="grid grid-cols-2 gap-2">
              {sides.map((s) => (
                <label key={s.id} className="inline-flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedSides.includes(s.id)}
                    onCheckedChange={(checked) => {
                      const isChecked = Boolean(checked)
                      setSelectedSides((prev) =>
                        isChecked ? (prev.includes(s.id) ? prev : [...prev, s.id]) : prev.filter((x) => x !== s.id),
                      )
                    }}
                  />
                  <span className="text-muted-foreground">{s.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Save</AlertDialogTitle>
                <AlertDialogDescription>Save changes to {name}? This will update the guest's RSVP details.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditRsvpDialog
