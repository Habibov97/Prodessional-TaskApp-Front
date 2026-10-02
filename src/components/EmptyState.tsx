import { cn } from '@/lib/utils';

export default function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-1 px-4 py-10 text-center', className)}>
      <p className="text-sm font-medium text-stone-500">{title}</p>
      {description && <p className="text-xs text-stone-400">{description}</p>}
    </div>
  );
}
