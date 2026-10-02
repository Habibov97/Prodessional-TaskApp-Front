import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Images come straight from the Supabase public bucket (already a CDN), so a
// plain <img> is used instead of next/image and its remote host config.
export default function TaskImage({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
  return (
    <div className={cn('flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted', className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
      ) : (
        <ImageIcon className="size-1/3 max-h-10 max-w-10 text-muted-foreground/60" aria-hidden />
      )}
    </div>
  );
}
