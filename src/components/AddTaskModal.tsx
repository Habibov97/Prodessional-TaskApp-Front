'use client';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Field, FieldGroup, FieldLabel, FieldDescription } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useState } from 'react';
import { taskFormAction } from '@/actions/taskForm.action';
import { FieldError } from './FieldError';
import { useCategories } from '@/hooks/useCategories';
import { TaskType } from '@/types/task.types';
import { PiNotePencilDuotone } from 'react-icons/pi';

const NOT_STARTED_KEY = 'not started';
const key = (t: string) => t.trim().toLowerCase();

const PRIORITY_DOT: Record<string, string> = {
  extreme: 'bg-red-500',
  moderate: 'bg-blue-500',
  low: 'bg-green-500',
};
const PRIORITY_CHECKBOX: Record<string, string> = {
  extreme: 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
  moderate: 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
  low: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
};
const STATUS_DOT: Record<string, string> = {
  'not started': 'bg-red-500',
  'in progress': 'bg-blue-500',
  done: 'bg-green-500',
  completed: 'bg-green-500',
};
const STATUS_CHECKBOX: Record<string, string> = {
  'not started': 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
  'in progress': 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
  done: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
  completed: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
};
const DEFAULT_DOT = 'bg-stone-400';
const DEFAULT_CHECKBOX = 'data-[state=checked]:bg-stone-400 data-[state=checked]:border-stone-400';

export default function AddTaskModal({ updateTask }: { updateTask?: TaskType }) {
  const isUpdate = !!updateTask;

  const [open, setOpen] = useState(false);
  const [selectedPriorityId, setSelectedPriorityId] = useState<string | null>(null);
  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);

  const [state, action, isLoading] = useActionState(taskFormAction, {});
  const { priorities, statuses, isLoading: categoriesLoading, error: categoriesError } = useCategories(open);

  // Sync selection state when modal opens/closes
  useEffect(() => {
    if (open && isUpdate) {
      setSelectedPriorityId(updateTask.priorityId);
      setSelectedStatusId(updateTask.statusId);
    }
    if (!open) {
      setSelectedPriorityId(null);
      setSelectedStatusId(null);
    }
  }, [open]);

  // Create mode: auto-select first priority once loaded
  useEffect(() => {
    if (!isUpdate && priorities.length > 0 && !selectedPriorityId) {
      setSelectedPriorityId(priorities[0].id);
    }
  }, [priorities]);

  // Create mode: auto-select "Not Started" once loaded
  useEffect(() => {
    if (!isUpdate && statuses.length > 0 && !selectedStatusId) {
      const notStarted = statuses.find((s) => key(s.title) === NOT_STARTED_KEY);
      if (notStarted) setSelectedStatusId(notStarted.id);
    }
  }, [statuses]);

  // Close on success
  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.success]);

  const canSubmit = !isLoading && !categoriesLoading && !!selectedStatusId && !!selectedPriorityId;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center text-[14px] cursor-pointer">
          {isUpdate ? (
            <div className="w-9 h-9 rounded-md bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors text-white">
              <PiNotePencilDuotone />
            </div>
          ) : (
            <>
              <span className="text-[23px]">
                <HiOutlinePlusSmall />
              </span>
              <span>Add Task</span>
            </>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400 self-start mb-2">
            {isUpdate ? 'Update Task' : 'Add New Task'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isUpdate ? 'Update the task details below.' : 'Fill out the form below to add a new task.'}
          </DialogDescription>
        </DialogHeader>

        {categoriesError && (
          <p className="text-sm text-red-500">Could not load priority/status options: {categoriesError}</p>
        )}
        {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}

        {/* key forces form remount when switching between tasks, resetting uncontrolled inputs */}
        <form action={action} id="add-task-form" key={updateTask?.id ?? 'new'}>
          {/* Hidden field: tells the action whether this is a create or update */}
          {isUpdate && <input type="hidden" name="taskId" value={updateTask.id} />}

          <div className="border border-stone-200 p-6 flex justify-center gap-5">
            <FieldGroup className="w-2/3">
              <Field>
                <Label htmlFor="title" className="font-bold text-[#333]">
                  Name
                </Label>
                <Input id="title" name="title" defaultValue={updateTask?.title ?? ''} />
                <FieldError errors={state.errors?.title} />
              </Field>

              <Field>
                <Label className="font-bold text-[#333]">Priority</Label>
                {categoriesLoading ? (
                  <div className="text-xs text-stone-400">Loading...</div>
                ) : (
                  <div className="flex gap-5">
                    {priorities.map((p) => (
                      <div key={p.id} className="flex gap-1.5 items-center">
                        <div className={`w-[8px] h-[8px] rounded-full ${PRIORITY_DOT[key(p.title)] ?? DEFAULT_DOT}`} />
                        <div className="text-xs">{p.title}</div>
                        <Checkbox
                          id={`priority-${p.id}`}
                          name="priorityId"
                          value={p.id}
                          className={PRIORITY_CHECKBOX[key(p.title)] ?? DEFAULT_CHECKBOX}
                          checked={selectedPriorityId === p.id}
                          onCheckedChange={(checked) => setSelectedPriorityId(checked ? p.id : null)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Field>

              <Field>
                <Label className="font-bold text-[#333]">Status</Label>
                {categoriesLoading ? (
                  <div className="text-xs text-stone-400">Loading...</div>
                ) : isUpdate ? (
                  // Update mode: all statuses selectable
                  <div className="flex gap-5">
                    {statuses.map((s) => (
                      <div key={s.id} className="flex gap-1.5 items-center">
                        <div className={`w-[8px] h-[8px] rounded-full ${STATUS_DOT[key(s.title)] ?? DEFAULT_DOT}`} />
                        <div className="text-xs">{s.title}</div>
                        <Checkbox
                          id={`status-${s.id}`}
                          name="statusId"
                          value={s.id}
                          className={STATUS_CHECKBOX[key(s.title)] ?? DEFAULT_CHECKBOX}
                          checked={selectedStatusId === s.id}
                          onCheckedChange={(checked) => setSelectedStatusId(checked ? s.id : null)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Create mode: always "Not Started", read-only
                  selectedStatusId && (
                    <div className="flex gap-1.5 items-center">
                      <div className={`w-[8px] h-[8px] rounded-full ${STATUS_DOT['not started']}`} />
                      <div className="text-xs">Not Started</div>
                      <input type="hidden" name="statusId" value={selectedStatusId} />
                    </div>
                  )
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="textarea-message" className="font-bold text-[#333]">
                  Task Description
                </FieldLabel>
                <Textarea
                  id="textarea-message"
                  name="description"
                  className="h-[160px] resize-none pr-3 custom-scrollbar"
                  placeholder="Start writing here..."
                  defaultValue={updateTask?.description ?? ''}
                />
                <FieldError errors={state.errors?.description} />
              </Field>
            </FieldGroup>

            <FieldGroup className="w-1/3">
              <Field>
                <FieldLabel htmlFor="picture" className="font-bold text-[#333]">
                  Upload Image
                </FieldLabel>
                <FieldDescription>Select a picture to upload.</FieldDescription>
                <Input id="picture" name="picture" type="file" />
              </Field>
            </FieldGroup>
          </div>
        </form>

        <DialogFooter>
          <Button type="submit" form="add-task-form" className="bg-red-500 hover:bg-red-600" disabled={!canSubmit}>
            {isLoading ? 'Loading...' : isUpdate ? 'Update Task' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
