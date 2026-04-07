import { Button } from "../../../components/ui/button";
import {
  Bookmark,
  BookmarkCheck,
  Edit2,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  announcementId: string;
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export function AnnouncementActions({
  announcementId,
  isLiked,
  likeCount,
  isBookmarked,
  onLike,
  onBookmark,
  onShare,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
      <Button
        variant={isLiked ? "default" : "outline"}
        size="sm"
        onClick={onLike}
        className="gap-2"
      >
        <ThumbsUp className={`size-4 ${isLiked ? "fill-current" : ""}`} />
        {likeCount > 0 ? likeCount : "Like"}
      </Button>

      <Button
        variant={isBookmarked ? "default" : "outline"}
        size="sm"
        onClick={onBookmark}
        className="gap-2"
      >
        {isBookmarked ? (
          <BookmarkCheck className="size-4 fill-current" />
        ) : (
          <Bookmark className="size-4" />
        )}
        {isBookmarked ? "Saved" : "Save"}
      </Button>

      <Button variant="outline" size="sm" onClick={onShare} className="gap-2">
        <Share2 className="size-4" />
        Share
      </Button>

      <div className="flex-1" />

      <Button variant="outline" size="sm" asChild className="gap-2">
        <Link to={`/announcements?edit=${announcementId}`}>
          <Edit2 className="size-4" />
          Edit
        </Link>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
}