"use client";

// import { useEffect, useState } from "react";

// import {
//   PopoverForm,
//   PopoverFormButton,
//   PopoverFormCutOutLeftIcon,
//   PopoverFormCutOutRightIcon,
//   PopoverFormSeparator,
//   PopoverFormSuccess,
// } from "./animation";
// import { cn } from "@/lib/utils";
// import NoteEditor from "./noteform";

// type FormState = "idle" | "loading" | "success";

// export function FeedbackFormExample() {
//   const [formState, setFormState] = useState<FormState>("idle");
//   const [open, setOpen] = useState(false);
//   const [feedback, setFeedback] = useState("");

//   function submit() {
//     setFormState("loading");
//     setTimeout(() => {
//       setFormState("success");
//     }, 1500);

//     setTimeout(() => {
//       setOpen(false);
//       setFormState("idle");
//       setFeedback("");
//     }, 3300);
//   }

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }

//       if (
//         (event.ctrlKey || event.metaKey) &&
//         event.key === "Enter" &&
//         open &&
//         formState === "idle"
//       ) {
//         submit();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [open, formState]);

//   return (
//     <div className={cn("absolute right-2 top-2", open && "w-full h-[500px]")}>
//       <PopoverForm
//         title="Add Note"
//         open={open}
//         setOpen={setOpen}
//         width="900px"
//         height="500px"
//         showCloseButton={formState !== "success"}
//         showSuccess={formState === "success"}
//         openChild={
//           <>
//             <div className="relative">
//               <NoteEditor />
//             </div>
//             <div className="relative flex h-12 items-center px-[10px]">
//               <PopoverFormSeparator />
//               <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
//                 <PopoverFormCutOutLeftIcon />
//               </div>
//               <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
//                 <PopoverFormCutOutRightIcon />
//               </div>
//               <PopoverFormButton
//                 loading={formState === "loading"}
//                 text="Submit"
//               />
//             </div>
//           </>
//         }
//         successChild={
//           <PopoverFormSuccess
//             title="Feedback Received"
//             description="Thank you for supporting our project!"
//           />
//         }
//       />
//     </div>
//   );
// }

// export default function PopoverFormExamples() {
//   return (
//     <div className="relative h-full w-full">
//       <FeedbackFormExample />
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import { useGetVaultQuery } from "@/lib/store/api/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useDecryptedData } from "@/hooks/dec-data";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  username: string;
  authtoken: boolean;
}

const ViewAll = () => {
  const { accessToken, user } = useAuthUser();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  console.log(user);
  const {
    data: encryptedData,
    isLoading,
    refetch,
  } = useGetVaultQuery(
    { search, page_size: rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken },
  );
  const { data } = useDecryptedData(encryptedData, isLoading);
  const [logins, setLogins] = useState<VaultData[]>([]);

  useEffect(() => {
    if (encryptedData) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setLogins(data.results);
    }
  }, [data, page, exclude_by]);

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [search]);

  return (
    <div className="flex flex-col relative h-full">
      <div className="flex justify-between gap-3 items-end border-b-1 pb-2">
        <div className="relative w-full pl-1">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            className="h-8 w-full peer pe-9 ps-9  "
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {searchLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
      {/* {data && data.count == 0 && <Empty />}
      {data && data.count > 0 && <View logins={logins} />} */}
    </div>
  );
};

export default ViewAll;
