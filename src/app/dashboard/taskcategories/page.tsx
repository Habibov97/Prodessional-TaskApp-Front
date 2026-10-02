import type { Metadata } from 'next';
import GoBack from '@/components/GoBack';
import TaskCategoriesActions from '@/components/TaskCategoriesActions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Task Categories',
};

const SECTIONS = [
  { title: 'Task Status', kind: { taskStatus: true }, items: ['Completed', 'In Progress', 'Not Started'] },
  { title: 'Task Priority', kind: { taskPriority: true }, items: ['Extreme', 'Moderate', 'Low'] },
];

export default function TaskCategories() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="relative pb-1 text-xl font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
          Task Categories
        </h2>
        <GoBack />
      </div>

      {SECTIONS.map((section, index) => (
        <div key={section.title} className="flex flex-col gap-5">
          {index > 0 && <div className="h-px w-full bg-stone-300" />}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="relative pb-1 font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-[50px] after:bg-green-500">
              {section.title}
            </h3>
            <TaskCategoriesActions {...section.kind} edit={false} />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-[420px]">
              <TableHeader>
                <TableRow className="h-12 bg-stone-100">
                  <TableHead className="w-16 text-center font-bold text-stone-700">SN</TableHead>
                  <TableHead className="text-center font-bold text-stone-700">{section.title}</TableHead>
                  <TableHead className="w-[200px] text-center font-bold text-stone-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.items.map((item, i) => (
                  <TableRow key={item} className="h-16">
                    <TableCell className="text-center font-medium text-stone-600">{i + 1}</TableCell>
                    <TableCell className="text-center text-stone-600">{item}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <TaskCategoriesActions {...section.kind} edit={true} />
                        <Button className="h-9 w-[80px] shrink-0 rounded-md bg-red-500 text-white hover:bg-red-600">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </section>
  );
}
