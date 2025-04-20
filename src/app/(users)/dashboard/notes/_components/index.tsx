"use client";

import { useEffect, useState } from "react";

import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "./animation";
import { cn } from "@/lib/utils";
import NoteEditor from "./noteform";

type FormState = "idle" | "loading" | "success";

export function FeedbackFormExample() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setFeedback("");
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className={cn("absolute right-2 top-2", open && "w-full h-[500px]")}>
      <PopoverForm
        title="Add Note"
        open={open}
        setOpen={setOpen}
        width="900px"
        height="500px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <>
            <div className="relative">
              <NoteEditor />
            </div>
            <div className="relative flex h-12 items-center px-[10px]">
              <PopoverFormSeparator />
              <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                <PopoverFormCutOutRightIcon />
              </div>
              <PopoverFormButton
                loading={formState === "loading"}
                text="Submit"
              />
            </div>
          </>
        }
        successChild={
          <PopoverFormSuccess
            title="Feedback Received"
            description="Thank you for supporting our project!"
          />
        }
      />
    </div>
  );
}

export default function PopoverFormExamples() {
  return (
    <div className="relative h-full w-full">
      <FeedbackFormExample />
    </div>
  );
}
