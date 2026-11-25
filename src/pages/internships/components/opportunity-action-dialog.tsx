import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog'
import { Button } from '../../../components/ui/button'
import type { Opportunity, OpportunityAction } from '../types/opportunity'

interface Props {
  target: { item: Opportunity; action: OpportunityAction } | null
  pending: boolean
  onCancel: () => void
  onConfirm: () => void
}

function copyFor(item: Opportunity, action: OpportunityAction) {
  if (action === 'publish') {
    return {
      title: item.status === 'closed' ? 'Re-publish this opportunity?' : 'Publish this opportunity?',
      // Only the first publish sends a push notification (published_at is set once).
      description: item.published_at
        ? 'It becomes visible to members in the app again. No new notification is sent.'
        : 'Members will see it in the app straight away and every member gets a push notification.',
      confirm: item.status === 'closed' ? 'Re-publish' : 'Publish',
      destructive: false,
    }
  }
  if (action === 'close') {
    return {
      title: 'Close applications?',
      description: 'Members stop seeing this listing immediately. You can publish it again later.',
      confirm: 'Close applications',
      destructive: false,
    }
  }
  return {
    title: 'Archive this opportunity?',
    description: "Archived listings are hidden from members and can't be edited or published again. This can't be undone.",
    confirm: 'Archive',
    destructive: true,
  }
}

export function OpportunityActionDialog({ target, pending, onCancel, onConfirm }: Props) {
  const copy = target ? copyFor(target.item, target.action) : null
  return (
    <AlertDialog open={Boolean(target)} onOpenChange={(open) => !open && !pending && onCancel()}>
      <AlertDialogContent>
        {target && copy && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{copy.title}</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="block font-medium text-foreground">
                  {target.item.title} · {target.item.organization}
                </span>
                <span className="mt-2 block">{copy.description}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              {/* A plain button so the dialog stays open (and shows progress) until the request finishes. */}
              <Button
                variant={copy.destructive ? 'destructive' : 'default'}
                disabled={pending}
                onClick={onConfirm}
              >
                {pending ? 'Working…' : copy.confirm}
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
