import { Bell } from "lucide-react";
import { DashboardLayout } from "../../../components/dashboard-layout";

export function AnnouncementNotFound() {
  return (
    <DashboardLayout
      title="Announcement Not Found"
      breadcrumbs={[
        { label: "Announcements", href: "/announcements" },
        { label: "Not Found" },
      ]}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <Bell className="size-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Announcement Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The announcement you are looking for does not exist or has been removed.
        </p>
      </div>
    </DashboardLayout>
  );
}