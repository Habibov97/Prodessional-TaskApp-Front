'use client';
import { CalendarIcon } from 'lucide-react';
import { DUE_LABELS, DUE_STYLES, formatDueDate, getDueState } from '@/constants/due-date';
import { useToday } from '@/hooks/useToday';
import { cn } from '@/lib/utils';

export default function DueBadge({
  dueDate,
  completed = false,
  className,
}: {
  dueDate: string | null;
  completed?: boolean;
  className?: string;
}) {
  const today = useToday();
  if (!dueDate) return null;

  // Completed tasks are never "overdue"; just show the date.
  const state = completed ? 'upcoming' : (getDueState(dueDate, today) ?? 'upcoming');
  const label = state === 'upcoming' ? DUE_LABELS.upcoming : DUE_LABELS[state];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ring-1 ring-inset',
        DUE_STYLES[state],
        className,
      )}
    >
      <CalendarIcon className="size-3" aria-hidden />
      {label} {formatDueDate(dueDate)}
    </span>
  );
}
