import { Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Announcement } from "../types/announcement";

interface Props {
  announcement: Announcement;
}

export function AnnouncementHeader({ announcement }: Props) {
  const date =
    announcement.published_at

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
        {announcement.title}
      </h1>

      <div className="flex items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          {format(new Date(date), "MMMM d, yyyy")}
        </div>
      </div>
    </>
  );
}