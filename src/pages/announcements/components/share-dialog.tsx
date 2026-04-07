import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcementId: string;
}

export function ShareDialog({ open, onOpenChange, announcementId }: Props) {
  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/announcements/${announcementId}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Announcement</DialogTitle>
          <DialogDescription>
            Share this announcement with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <Button size="sm" variant="outline">
              Copy
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <ExternalLink className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Download className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}