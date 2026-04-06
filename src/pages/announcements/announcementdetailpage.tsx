"use client";

import { useState, type SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Users,
  Eye,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  ThumbsUp,
  Edit2,
  Trash2,
  Send,
  Bell,
  AlertTriangle,
  CheckCircle2,
  X,
  Download,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  authorRole?: string;
  status: "published" | "draft" | "pending";
  priority: "low" | "medium" | "high";
  audience: "all" | "members" | "executives";
  images: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
  views?: number;
  likes?: number;
  comments?: Comment[];
}

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
}

const mockAnnouncements: Record<string, Announcement> = {
  "1": {
    id: "1",
    title: "Annual General Meeting 2024",
    content: `We are pleased to announce the Annual General Meeting for 2024. This is an important event for all members of our organization.

**Meeting Details:**
- **Date:** March 25, 2024
- **Time:** 10:00 AM - 2:00 PM
- **Venue:** Grand Conference Hall, Building A

**Agenda:**
1. Welcome address by the Chairman
2. Review of the previous year's minutes
3. Financial report presentation
4. Performance review and achievements
5. Election of new board members
6. Open forum for member questions
7. Closing remarks

**Important Notes:**
- All members are encouraged to attend
- Please bring your membership ID for verification
- Refreshments will be served after the meeting
- Parking is available in the basement

We look forward to seeing you there and appreciate your continued support and participation in our organization's growth.

For any questions or special accommodations, please contact the administrative office at admin@example.com or call (555) 123-4567.`,
    author: "John Admin",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    authorRole: "Administrator",
    status: "published",
    priority: "high",
    audience: "all",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=600&fit=crop",
    ],
    publishedAt: new Date("2024-03-15"),
    createdAt: new Date("2024-03-15"),
    views: 1247,
    likes: 89,
    comments: [
      {
        id: "c1",
        author: "Sarah Miller",
        authorAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        content:
          "Looking forward to attending! Will there be virtual attendance options available?",
        createdAt: new Date("2024-03-16"),
      },
      {
        id: "c2",
        author: "Michael Chen",
        authorAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        content: "Great initiative! The agenda looks comprehensive.",
        createdAt: new Date("2024-03-16"),
      },
    ],
  },
  "2": {
    id: "2",
    title: "System Maintenance Notice",
    content: `**Important System Maintenance Scheduled**

We would like to inform all users that our systems will undergo scheduled maintenance to improve performance and security.

**Maintenance Window:**
- **Date:** Saturday, March 23, 2024
- **Time:** 2:00 AM - 6:00 AM (EST)
- **Duration:** Approximately 4 hours

**Affected Services:**
- User portal and dashboard
- API services
- File storage and downloads
- Email notifications

**What to Expect:**
During this maintenance window, all services will be temporarily unavailable. Users will not be able to log in or access any features. Any ongoing sessions will be terminated at the start of maintenance.

**Recommendations:**
1. Save all work before the maintenance window
2. Download any urgent files beforehand
3. Plan any time-sensitive tasks around the maintenance period

**Post-Maintenance:**
After maintenance is complete, you may need to:
- Clear your browser cache
- Log in again to your account
- Refresh any bookmarked pages

We apologize for any inconvenience this may cause and appreciate your patience as we work to improve our services.

For urgent matters during maintenance, please contact our emergency support line.`,
    author: "Tech Team",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    authorRole: "IT Department",
    status: "published",
    priority: "medium",
    audience: "all",
    images: [],
    publishedAt: new Date("2024-03-14"),
    createdAt: new Date("2024-03-14"),
    views: 892,
    likes: 23,
    comments: [],
  },
  "3": {
    id: "3",
    title: "New Member Benefits Program",
    content: `We are excited to announce the launch of our new Member Benefits Program, designed to reward our valued members with exclusive perks and privileges.

**Program Highlights:**

**Gold Tier Benefits:**
- 15% discount on all services
- Priority customer support
- Early access to new features
- Monthly newsletter with exclusive content

**Platinum Tier Benefits:**
- All Gold benefits, plus:
- 25% discount on all services
- Dedicated account manager
- Free premium features for 3 months
- Invitation to exclusive member events

**How to Qualify:**
- Gold Tier: Active membership for 6+ months
- Platinum Tier: Active membership for 12+ months

Check your email for personalized details on activating your benefits.`,
    author: "Sarah Manager",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    authorRole: "Marketing Manager",
    status: "draft",
    priority: "low",
    audience: "members",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    ],
    createdAt: new Date("2024-03-13"),
    views: 0,
    likes: 0,
    comments: [],
  },
};

const priorityConfig = {
  low: {
    label: "Low Priority",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    icon: CheckCircle2,
  },
  medium: {
    label: "Medium Priority",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Clock,
  },
  high: {
    label: "Urgent",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: AlertTriangle,
  },
};

const statusConfig = {
  published: {
    label: "Published",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: Eye,
  },
  draft: {
    label: "Draft",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    icon: FileText,
  },
  pending: {
    label: "Scheduled",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Clock,
  },
};

const audienceConfig = {
  all: { label: "Everyone", description: "Visible to all users" },
  members: {
    label: "Members Only",
    description: "Visible to registered members",
  },
  executives: {
    label: "Executives",
    description: "Visible to executive team only",
  },
};

export default function AnnouncementDetailPage() {
  const params = useParams();
  const navigate = useNavigate()
  const id = params.id as string;

  const [announcement] = useState<Announcement | null>(
    mockAnnouncements[id] || null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(announcement?.likes || 0);
  const [newComment, setNewComment] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!announcement) {
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
            The announcement you are looking for does not exist or has been
            removed.
          </p>
          
        </div>
      </DashboardLayout>
    );
  }

  const StatusIcon = statusConfig[announcement.status].icon;
  const PriorityIcon = priorityConfig[announcement.priority].icon;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + announcement.images.length) % announcement.images.length,
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleDelete = () => {
   navigate('/announcements')
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setNewComment("");
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3
            key={index}
            className="font-semibold text-foreground mt-6 mb-2 text-lg"
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*(.*)/);
        if (match) {
          return (
            <p key={index} className="text-muted-foreground ml-4 my-1">
              <span className="font-medium text-foreground">{match[1]}</span>
              {match[2]}
            </p>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <p
            key={index}
            className="text-muted-foreground ml-4 my-1 flex items-start gap-2"
          >
            <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
            {line.substring(2)}
          </p>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <p key={index} className="text-muted-foreground ml-4 my-1">
            {line}
          </p>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-muted-foreground my-1">
          {line}
        </p>
      );
    });
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
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="overflow-hidden border-border">
          {/* Image Gallery */}
          {announcement.images.length > 0 && (
            <div className="relative">
              <div
                className="relative aspect-[21/9] overflow-hidden cursor-pointer group"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src={announcement.images[currentImageIndex]}
                  alt={`${announcement.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Image Navigation */}
                {announcement.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {announcement.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`size-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {announcement.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {announcement.images.length > 1 && (
                <div className="flex gap-2 p-4 bg-muted/50 overflow-x-auto">
                  {announcement.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 size-16 rounded-lg overflow-hidden ring-2 transition-all ${
                        index === currentImageIndex
                          ? "ring-primary"
                          : "ring-transparent hover:ring-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <CardContent className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex flex-wrap items-start gap-3 mb-6">
              <Badge className={statusConfig[announcement.status].className}>
                <StatusIcon className="size-3 mr-1" />
                {statusConfig[announcement.status].label}
              </Badge>
              <Badge
                className={priorityConfig[announcement.priority].className}
              >
                <PriorityIcon className="size-3 mr-1" />
                {priorityConfig[announcement.priority].label}
              </Badge>
              <Badge variant="outline">
                <Users className="size-3 mr-1" />
                {audienceConfig[announcement.audience].label}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
              {announcement.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 ring-2 ring-background">
                  <AvatarImage
                    src={announcement.authorAvatar}
                    alt={announcement.author}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {announcement.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {announcement.author}
                  </p>
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

            {/* Content */}
            <div className="py-8 prose prose-slate dark:prose-invert max-w-none">
              {formatContent(announcement.content)}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <ThumbsUp
                  className={`size-4 ${isLiked ? "fill-current" : ""}`}
                />
                {likeCount > 0 ? likeCount : "Like"}
              </Button>

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="gap-2"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="size-4 fill-current" />
                ) : (
                  <Bookmark className="size-4" />
                )}
                {isBookmarked ? "Saved" : "Save"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="size-4" />
                Share
              </Button>

              <div className="flex-1" />

              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link to={`/announcements?edit=${announcement.id}`}>
                  <Edit2 className="size-4" />
                  Edit
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="mt-6 border-border">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="size-5" />
              Comments ({announcement.comments?.length || 0})
            </h2>

            {/* Add Comment */}
            <div className="flex gap-3 mb-8">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setNewComment(e.target.value)}
                  className="mb-3 resize-none"
                  rows={3}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="gap-2"
                >
                  <Send className="size-4" />
                  Post Comment
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Comments List */}
            {announcement.comments && announcement.comments.length > 0 ? (
              <div className="space-y-6">
                {announcement.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage
                        src={comment.authorAvatar}
                        alt={comment.author}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(comment.createdAt, "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="size-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Announcements */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Related Announcements
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.values(mockAnnouncements)
              .filter((a) => a.id !== announcement.id)
              .slice(0, 2)
              .map((related) => (
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
      </div>

      {/* Fullscreen Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>View Image</DialogTitle>
            <DialogDescription>Full screen image gallery</DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="size-6" />
            </button>

            <img
              src={announcement.images[currentImageIndex]}
              alt={`${announcement.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {announcement.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {announcement.images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
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
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/announcements/${announcement.id}`}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this announcement? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
