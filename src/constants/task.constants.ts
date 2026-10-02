export const titleKey = (title?: string | null) => title?.trim().toLowerCase() ?? '';

export const NOT_STARTED = 'not started';
export const IN_PROGRESS = 'in progress';
export const COMPLETED = 'completed';

export const STATUS_ORDER = [NOT_STARTED, IN_PROGRESS, COMPLETED];
export const PRIORITY_ORDER = ['extreme', 'moderate', 'low'];

export type Tone = {
  dot: string;
  text: string;
  border: string;
  stroke: string;
  radio: string;
};

const TONES = {
  red: {
    dot: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    stroke: 'stroke-red-500',
    radio: 'data-checked:bg-red-500',
  },
  purple: {
    dot: 'bg-purple-500',
    text: 'text-purple-500',
    border: 'border-purple-500',
    stroke: 'stroke-purple-500',
    radio: 'data-checked:bg-purple-500',
  },
  blue: {
    dot: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    stroke: 'stroke-blue-500',
    radio: 'data-checked:bg-blue-500',
  },
  green: {
    dot: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    stroke: 'stroke-green-500',
    radio: 'data-checked:bg-green-500',
  },
  stone: {
    dot: 'bg-stone-400',
    text: 'text-stone-500',
    border: 'border-stone-400',
    stroke: 'stroke-stone-400',
    radio: 'data-checked:bg-stone-500',
  },
} satisfies Record<string, Tone>;

const STATUS_TONES: Record<string, Tone> = {
  [NOT_STARTED]: TONES.red,
  [IN_PROGRESS]: TONES.purple,
  [COMPLETED]: TONES.green,
};

const PRIORITY_TONES: Record<string, Tone> = {
  extreme: TONES.red,
  moderate: TONES.blue,
  low: TONES.green,
};

export const statusTone = (title?: string | null) => STATUS_TONES[titleKey(title)] ?? TONES.stone;
export const priorityTone = (title?: string | null) => PRIORITY_TONES[titleKey(title)] ?? TONES.stone;

// The backend refuses to rename or delete these; the app depends on them.
export const isProtectedCategory = (title?: string | null) => [NOT_STARTED, COMPLETED].includes(titleKey(title));

export const isCompletedStatus = (title?: string | null) => titleKey(title) === COMPLETED;

export function sortByTitleOrder<T extends { title: string }>(items: T[], order: string[]): T[] {
  const rank = (item: T) => {
    const index = order.indexOf(titleKey(item.title));
    return index === -1 ? order.length : index;
  };
  return [...items].sort((a, b) => rank(a) - rank(b));
}
