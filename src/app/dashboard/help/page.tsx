import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help',
};

const TOPICS = [
  {
    question: 'How do I add a task?',
    answer:
      'Open the Dashboard and press "Add Task" in the To-Do card. Give it a name, a priority and a description. A due date and an image are optional. New tasks always start as "Not Started".',
  },
  {
    question: 'How do I format a description?',
    answer:
      'Use the toolbar above the description: bold, italic, underline, strikethrough, inline code, headings, bullet and numbered lists, quotes and code blocks. Shortcuts work too (Ctrl+B, Ctrl+I, Ctrl+U). Tab inserts a tab, or indents a list item. A code block keeps every space and line break exactly as typed.',
  },
  {
    question: 'How do I change a task?',
    answer:
      'Open the task (click it, or use "View details" from its ••• menu) and press the pencil button. There you can edit every field, change the status, set or clear the due date and replace or remove the image.',
  },
  {
    question: 'What are vital tasks?',
    answer:
      'Vital tasks are the ones you want to keep an eye on. Use "Mark as Vital" in a task\'s ••• menu to move it from My Task to Vital Task, and "Unmark as Vital" to move it back.',
  },
  {
    question: 'How do I finish a task?',
    answer:
      'Choose "Mark as Completed" in the task\'s ••• menu, or set its status to "Completed" when editing. Completed tasks appear in the Completed Task card on the Dashboard.',
  },
  {
    question: 'What do the notifications show?',
    answer:
      'The bell lists open tasks that are overdue, due today or due tomorrow. It is based on due dates, so tasks without one never appear there.',
  },
  {
    question: 'How does search work?',
    answer: 'The search bar matches words in task titles and descriptions. On small screens use the search icon in the top bar.',
  },
  {
    question: 'Who can change task categories?',
    answer:
      'Statuses and priorities are shared by all users, so only an admin can add, rename or delete them. "Not Started" and "Completed" are system statuses and cannot be changed. A category that is still used by a task cannot be deleted.',
  },
];

export default function Help() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6">
      <h1 className="relative self-start pb-1 text-xl font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
        Help
      </h1>

      <div className="flex flex-col gap-3">
        {TOPICS.map((topic) => (
          <details key={topic.question} className="group rounded-xl border border-border open:bg-muted/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {topic.question}
              <span className="text-xl leading-none text-red-500 transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-foreground/80">{topic.answer}</p>
          </details>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Something else? Check your{' '}
        <Link href="/dashboard/settings" className="text-blue-500 hover:underline">
          account settings
        </Link>{' '}
        or go back to the{' '}
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          dashboard
        </Link>
        .
      </p>
    </section>
  );
}
