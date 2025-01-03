"use client";
import Image from "next/image";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function TaskPage({ tasks }: { tasks: any }) {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
