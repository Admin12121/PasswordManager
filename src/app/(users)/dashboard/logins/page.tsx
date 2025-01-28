import React from "react";
import TaskPage from "./_components";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";


const Page = async () => {
  const tasks = ""
  return <TaskPage tasks={tasks} />;
};

export default Page;
