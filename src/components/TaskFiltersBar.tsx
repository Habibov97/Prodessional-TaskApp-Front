'use client';
import { cn } from '@/lib/utils';
import { DEFAULT_FILTERS, isDefaultFilters, type TaskFilters } from '@/lib/task-filters';
import type { TaskCategories } from '@/lib/api';

type Option = { value: string; label: string };

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-[11px] font-medium text-muted-foreground">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'h-8 w-full min-w-0 cursor-pointer rounded-md border border-border bg-card px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-red-300',
          value !== 'all' && value !== 'newest' && 'border-red-300 dark:border-red-500/50',
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function TaskFiltersBar({
  filters,
  onChange,
  categories,
  shown,
  total,
}: {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  categories: TaskCategories;
  shown: number;
  total: number;
}) {
  const set = (patch: Partial<TaskFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(status) => set({ status })}
          options={[{ value: 'all', label: 'All' }, ...categories.statuses.map((s) => ({ value: s.id, label: s.title }))]}
        />
        <FilterSelect
          label="Priority"
          value={filters.priority}
          onChange={(priority) => set({ priority })}
          options={[
            { value: 'all', label: 'All' },
            ...categories.priorities.map((p) => ({ value: p.id, label: p.title })),
          ]}
        />
        <FilterSelect
          label="Due date"
          value={filters.due}
          onChange={(due) => set({ due: due as TaskFilters['due'] })}
          options={[
            { value: 'all', label: 'Any' },
            { value: 'overdue', label: 'Overdue' },
            { value: 'week', label: 'Next 7 days' },
            { value: 'none', label: 'No due date' },
          ]}
        />
        <FilterSelect
          label="Sort by"
          value={filters.sort}
          onChange={(sort) => set({ sort: sort as TaskFilters['sort'] })}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'due', label: 'Due date' },
            { value: 'priority', label: 'Priority' },
          ]}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground" aria-live="polite">
        <span>
          Showing {shown} of {total}
        </span>
        {!isDefaultFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange({ ...DEFAULT_FILTERS, sort: filters.sort })}
            className="cursor-pointer font-medium text-red-500 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
