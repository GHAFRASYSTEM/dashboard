"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import type { Announcement } from "./types/announcement";
import { mockAnnouncements } from "./data/mock-announcements";
import { AnnouncementNotFound } from "./components/announcement-not-found";
import { AnnouncementGallery } from "./components/announcement-gallery";
import { AnnouncementHeader } from "./components/announcement-header";
import { AnnouncementContent } from "./components/announcement-content";
import { AnnouncementActions } from "./components/announcement-actions";
import { AnnouncementComments } from "./components/announcement-comments";
import { RelatedAnnouncements } from "./components/related-announcements";
import { ImageModal } from "./components/image-modal";
import { ShareDialog } from "./components/share-dialog";
import { DeleteDialog } from "./components/delete-dialog";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id as string;

  const [announcement] = useState<Announcement | null>(
  mockAnnouncements.find((item) => item.id === id) || null,
)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(announcement?.likes || 0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!announcement) {
    return <AnnouncementNotFound />;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + announcement.images.length) % announcement.images.length
    );
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDelete = () => {
    navigate("/announcements");
  };

  return (
    <DashboardLayout
      title={announcement.title}
      breadcrumbs={[
        { label: "Announcements", href: "/announcements" },
        { label: announcement.title },
      ]}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/announcements">
              <ArrowLeft className="size-4" />
              Back to announcements
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-border">
          <AnnouncementGallery
            title={announcement.title}
            images={announcement.images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            setIsImageModalOpen={setIsImageModalOpen}
            nextImage={nextImage}
            prevImage={prevImage}
          />

          <CardContent className="p-6 sm:p-8">
            <AnnouncementHeader announcement={announcement} />
            <AnnouncementContent content={announcement.content} />

            <AnnouncementActions
              announcementId={announcement.id}
              isLiked={isLiked}
              likeCount={likeCount}
              isBookmarked={isBookmarked}
              onLike={handleLike}
              onBookmark={() => setIsBookmarked((prev) => !prev)}
              onShare={() => setIsShareDialogOpen(true)}
              onDelete={() => setIsDeleteDialogOpen(true)}
            />
          </CardContent>
        </Card>

        <AnnouncementComments comments={announcement.comments} />

        <RelatedAnnouncements
          currentAnnouncementId={announcement.id}
          announcements={Object.values(mockAnnouncements)}
        />
      </div>

      <ImageModal
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
        title={announcement.title}
        images={announcement.images}
        currentImageIndex={currentImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
      />

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        announcementId={announcement.id}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}