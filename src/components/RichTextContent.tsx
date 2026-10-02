import { cn } from '@/lib/utils';

/** Renders a task description. `html` must already be sanitized (lib/api does it). */
export default function RichTextContent({ html, className }: { html: string; className?: string }) {
  return <div className={cn('rich-text', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
