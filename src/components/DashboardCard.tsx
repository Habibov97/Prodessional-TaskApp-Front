import { cn } from '@/lib/utils';

// Shared shell for the dashboard widgets: header row + scrollable body.
export default function DashboardCard({
  icon,
  title,
  action,
  className,
  bodyClassName,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn('flex min-h-0 flex-col rounded-xl px-4 pt-3 pb-5 shadow-[0_0_25px_rgba(0,0,0,0.08)] sm:px-6', className)}
    >
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-green-500">
          <span className="text-2xl text-stone-300">{icon}</span>
          <h2 className="text-sm">{title}</h2>
        </div>
        {action}
      </div>
      <div className={cn('min-h-0 flex-1', bodyClassName)}>{children}</div>
    </section>
  );
}
