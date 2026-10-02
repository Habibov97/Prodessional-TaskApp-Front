import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import GoBack from '@/components/GoBack';
import AddTaskModal from '@/components/AddTaskModal';
import DeleteTaskButton from '@/components/DeleteTaskButton';
import TaskImage from '@/components/TaskImage';
import DueBadge from '@/components/DueBadge';
import RichTextContent from '@/components/RichTextContent';
import { getCategories, getTask } from '@/lib/api';
import { isCompletedStatus, priorityTone, statusTone } from '@/constants/task.constants';

export default async function TaskDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [task, categories] = await Promise.all([getTask(id), getCategories()]);

  if (!task) notFound();

  return (
    <article className="flex flex-col gap-5 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6 lg:h-full lg:min-h-[480px]">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:gap-5">
        <TaskImage src={task.avatar} alt={task.title} className="size-28 sm:size-[170px]" />
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:justify-end sm:self-stretch">
          <h1 className="text-2xl font-semibold break-words text-foreground sm:text-3xl">{task.title}</h1>
          <div className="flex gap-1 text-sm">
            <span>Priority:</span>
            <span className={priorityTone(task.priority?.title).text}>{task.priority?.title}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <span>Status:</span>
            <span className={statusTone(task.status?.title).text}>{task.status?.title}</span>
          </div>
          <div className="flex gap-1 text-sm text-muted-foreground">
            <span>Created on</span>
            <span>{format(new Date(task.createdAt), 'dd/MM/yyyy')}</span>
          </div>
          {task.completedAt && isCompletedStatus(task.status?.title) && (
            <div className="flex gap-1 text-sm text-muted-foreground">
              <span>Completed on</span>
              <span>{format(new Date(task.completedAt), 'dd/MM/yyyy')}</span>
            </div>
          )}
          <DueBadge
            dueDate={task.dueDate}
            completed={isCompletedStatus(task.status?.title)}
            className="self-start text-xs"
          />
        </div>
        <div className="self-end sm:self-start">
          <GoBack />
        </div>
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        <RichTextContent html={task.description} className="text-base" />
      </div>

      <div className="flex justify-end gap-3">
        <DeleteTaskButton taskId={task.id} taskTitle={task.title} redirectTo="/dashboard/mytask" />
        <AddTaskModal categories={categories} updateTask={task} />
      </div>
    </article>
  );
}
