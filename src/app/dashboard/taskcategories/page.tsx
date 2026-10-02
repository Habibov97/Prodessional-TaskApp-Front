import type { Metadata } from 'next';
import GoBack from '@/components/GoBack';
import CategoryFormDialog from '@/components/categories/CategoryFormDialog';
import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { isProtectedCategory } from '@/constants/task.constants';
import { getCategories, getMe } from '@/lib/api';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Task Categories',
};

export default async function TaskCategories() {
  const [user, categories] = await Promise.all([getMe(), getCategories()]);
  const isAdmin = user?.role === 'admin';

  const sections = [
    { title: 'Task Status', kind: 'Status', parentId: categories.statusRootId, items: categories.statuses },
    { title: 'Task Priority', kind: 'Priority', parentId: categories.priorityRootId, items: categories.priorities },
  ];

  return (
    <section className="flex flex-col gap-6 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="relative pb-1 text-xl font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
          Task Categories
        </h2>
        <GoBack />
      </div>

      {!isAdmin && (
        <p className="rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-500 ring-1 ring-stone-200">
          Categories are shared by everyone and can only be changed by an admin.
        </p>
      )}

      {sections.map((section, index) => (
        <div key={section.title} className="flex flex-col gap-5">
          {index > 0 && <div className="h-px w-full bg-stone-300" />}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="relative pb-1 font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-[50px] after:bg-green-500">
              {section.title}
            </h3>
            {isAdmin && section.parentId && <CategoryFormDialog kind={section.kind} parentId={section.parentId} />}
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table className={cn(isAdmin && 'min-w-[420px]')}>
              <TableHeader>
                <TableRow className="h-12 bg-stone-100">
                  <TableHead className="w-16 text-center font-bold text-stone-700">SN</TableHead>
                  <TableHead className="text-center font-bold text-stone-700">{section.title}</TableHead>
                  {isAdmin && <TableHead className="w-[200px] text-center font-bold text-stone-700">Action</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.items.map((item, i) => (
                  <TableRow key={item.id} className="h-16">
                    <TableCell className="text-center font-medium text-stone-600">{i + 1}</TableCell>
                    <TableCell className="text-center text-stone-600">{item.title}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        {isProtectedCategory(item.title) ? (
                          <p className="text-center text-xs text-stone-400">System status</p>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <CategoryFormDialog
                              kind={section.kind}
                              parentId={section.parentId ?? ''}
                              category={{ id: item.id, title: item.title }}
                            />
                            <DeleteCategoryButton id={item.id} title={item.title} />
                          </div>
                        )}
                      </TableCell>
                    )}
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
