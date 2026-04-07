import { Card, CardContent } from "../../../components/ui/card";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import type { Announcement } from "../types/announcement";

interface Props {
  currentAnnouncementId: string;
  announcements: Announcement[];
}

export function RelatedAnnouncements({
  currentAnnouncementId,
  announcements,
}: Props) {
  const relatedAnnouncements = announcements
    .filter((a) => a.id !== currentAnnouncementId)
    .slice(0, 2);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Related Announcements
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {relatedAnnouncements.map((related) => (
          <Link
            key={related.id}
            to={`/announcements/${related.id}`}
            className="group"
          >
            <Card className="overflow-hidden border-border hover:border-primary/30 transition-all hover:shadow-md">
              <CardContent className="p-4 flex gap-4">
                {related.images.length > 0 ? (
                  <div className="size-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={related.images[0]}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <div className="size-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Bell className="size-8 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {related.publishedAt
                      ? format(related.publishedAt, "MMM d, yyyy")
                      : format(related.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}