import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Calendar, Eye, Users } from "lucide-react";
import { format } from "date-fns";
import type { Announcement } from "../types/announcement";
import {
  audienceConfig,
  priorityConfig,
  statusConfig,
} from "../utils/announcement-config";

interface Props {
  announcement: Announcement;
}

export function AnnouncementHeader({ announcement }: Props) {
  const StatusIcon = statusConfig[announcement.status].icon;
  const PriorityIcon = priorityConfig[announcement.priority].icon;

  return (
    <>
      <div className="flex flex-wrap items-start gap-3 mb-6">
        <Badge className={statusConfig[announcement.status].className}>
          <StatusIcon className="size-3 mr-1" />
          {statusConfig[announcement.status].label}
        </Badge>

        <Badge className={priorityConfig[announcement.priority].className}>
          <PriorityIcon className="size-3 mr-1" />
          {priorityConfig[announcement.priority].label}
        </Badge>

        <Badge variant="outline">
          <Users className="size-3 mr-1" />
          {audienceConfig[announcement.audience].label}
        </Badge>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
        {announcement.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 ring-2 ring-background">
            <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {announcement.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-foreground">{announcement.author}</p>
            {announcement.authorRole && (
              <p className="text-sm text-muted-foreground">
                {announcement.authorRole}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {announcement.publishedAt
              ? format(announcement.publishedAt, "MMMM d, yyyy")
              : announcement.scheduledAt
                ? `Scheduled: ${format(announcement.scheduledAt, "MMM d, yyyy")}`
                : format(announcement.createdAt, "MMMM d, yyyy")}
          </div>

          {announcement.views !== undefined && announcement.views > 0 && (
            <div className="flex items-center gap-1.5">
              <Eye className="size-4" />
              {announcement.views.toLocaleString()} views
            </div>
          )}
        </div>
      </div>
    </>
  );
}