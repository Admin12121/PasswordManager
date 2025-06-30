import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { items } from "@/components/global/sites";
import { Input } from "@/components/ui/input";

const autoComplete = () => {
  return (
    <Input placeholder="Title"  />
  )
}

export default autoComplete