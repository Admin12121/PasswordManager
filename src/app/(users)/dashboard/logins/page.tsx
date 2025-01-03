import React from "react";
import TaskPage from "./_components";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "./_components/data/schema";

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "/src/app/(users)/dashboard/logins/_components/data/tasks.json"
    )
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}
const Page = async () => {
  const tasks = await getTasks();
  return <TaskPage tasks={tasks} />;
};

export default Page;
