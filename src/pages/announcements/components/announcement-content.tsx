import { formatContent } from "../utils/format-content";

interface Props {
  content: string;
}

export function AnnouncementContent({ content }: Props) {
  return (
    <div className="py-8 prose prose-slate dark:prose-invert max-w-none">
      {formatContent(content)}
    </div>
  );
}