import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 lg:h-full" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-9 w-64 max-w-full" />
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-xl lg:h-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-72 rounded-xl lg:flex-1" />
        </div>
      </div>
    </div>
  );
}
