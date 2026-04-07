import { useState, type SetStateAction } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Separator } from "../../../components/ui/separator";
import { MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import type { Comment } from "../types/announcement";

interface Props {
  comments?: Comment[];
}

export function AnnouncementComments({ comments = [] }: Props) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setNewComment("");
  };

  return (
    <Card className="mt-6 border-border">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <MessageSquare className="size-5" />
          Comments ({comments.length})
        </h2>

        <div className="flex gap-3 mb-8">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setNewComment(e.target.value)
              }
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

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
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
  );
}