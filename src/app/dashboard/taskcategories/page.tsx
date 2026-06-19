import GoBack from '@/components/GoBack';
import TaskCategoriesActions from '@/components/TaskCategoriesActions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TaskCategories() {
  return (
    <section className="px-[76px] flex-1">
      <main className="flex flex-col gap-6 border shadow-[0_0_5px_rgba(0,0,0,0.08)] p-[26px] mb-[26px] h-[76dvh] ">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="relative text-xl font-bold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500 mb-3">
              Task Categories
            </h2>
            <GoBack />
          </div>
        </div>
        <div className="overflow-y-auto ">
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="relative text-md font-bold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-[50px] after:bg-green-500">
                  Task Status
                </h3>
                <TaskCategoriesActions taskStatus={'Task Status'} />
              </div>
            </div>

            {/* TASK STATUS */}
            <div>
              <Table className="table-fixed w-full">
                <TableHeader className="border">
                  <TableRow className="h-12">
                    <TableHead className="w-[10%] text-center align-middle font-bold text-stone-700">SN</TableHead>
                    <TableHead className="w-[55%] text-center align-middle font-bold text-stone-700">
                      Task Status
                    </TableHead>
                    <TableHead className="w-[35%] text-center align-middle font-bold text-stone-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border">
                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">1</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">Completed</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">2</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">In Progress</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">3</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">Not Started</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="w-full h-[1px] bg-stone-400 my-10"></div>

          {/* TASK PRIORITY */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="relative text-md font-bold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-[50px] after:bg-green-500">
                Task Priority
              </h3>
              <TaskCategoriesActions taskPriority={'Task priority'} />
            </div>

            {/* TASK PRIORITY */}
            <div>
              <Table className="table-fixed w-full">
                <TableHeader className="border">
                  <TableRow className="h-12">
                    <TableHead className="w-[10%] text-center align-middle font-bold text-stone-700">SN</TableHead>
                    <TableHead className="w-[55%] text-center align-middle font-bold text-stone-700">
                      Task Priority
                    </TableHead>
                    <TableHead className="w-[35%] text-center align-middle font-bold text-stone-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border">
                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">1</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">Extreme</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">2</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">Moderate</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow className="h-16">
                    <TableCell className="w-[10%] text-center align-middle font-medium text-stone-600">3</TableCell>
                    <TableCell className="w-[55%] text-center align-middle text-stone-600">Low</TableCell>
                    <TableCell className="w-[35%] text-center align-middle">
                      <div className="flex gap-2 items-center justify-center w-full">
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Edit
                        </Button>
                        <Button className="text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-9 shrink-0">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
