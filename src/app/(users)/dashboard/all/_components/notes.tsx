import { useEffect, useState, useCallback } from "react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import {
  useGetNotesQuery,
  useVerifyvaultpasswordMutation,
  useGetLoggedUserQuery,
  useTrashNotesMutation,
  useSetvaultpasswordMutation,
} from "@/lib/store/api/api";
import { items } from "@/components/global/sites";
import {
  ArrowUpDown,
  CreditCard,
  UserRound,
  NotepadText,
  History,
  LayoutGrid,
  CircleAlert,
  File,
  EllipsisIcon,
  EllipsisVertical,
  Pin,
  Trash,
  EyeOff,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import LogoAnimation, {
  AnimatedNumber,
} from "@/components/global/logo_animation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { encryptData } from "@/hooks/dec-data";
import { useDecryptedData } from "@/hooks/dec-data";
import { UserData } from "@/schemas";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CustomDocument = Document.extend({
  content: "heading block*",
});

interface SiteProps {
  avatarProps: {
    name: string;
    icon?: any;
    classNames?: {
      base?: string;
      icon?: string;
    };
  };
  classNames?: {
    base?: string;
    description?: string;
    name?: string;
  };
  name: string;
}

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  authtoken: boolean;
}

const formSchema = z.object({
  slug: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  note: z
    .string()
    .max(500, { message: "Note must be less than 500 characters" })
    .optional(),
  security: z.boolean().optional(),
  authtoken: z.boolean().optional(),
});

const vaultPasswordSchema = z.object({
  vaultpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" }),
});

type VaultPassword = z.infer<typeof vaultPasswordSchema>;
type FormValues = z.infer<typeof formSchema>;

const defaultFormValues: FormValues = {
  slug: "",
  title: "",
  note: "",
  security: false,
  authtoken: false,
};

const defaultVaultPasswordValues: VaultPassword = {
  vaultpassword: "",
};

const NoteView = ({ slug, refetch }: { slug: string; refetch: any }) => {
  const { accessToken } = useAuthUser();
  const [user, setUser] = useState<UserData>();
  const [trash] = useTrashNotesMutation();
  const [editing, setEditing] = useState(true);
  const [setvault] = useSetvaultpasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const vaultPasswordForm = useForm<VaultPassword>({
    resolver: zodResolver(vaultPasswordSchema),
    mode: "onChange",
    defaultValues: defaultVaultPasswordValues,
  });

  const { reset, setValue, getValues, watch, formState, trigger } = form;
  const { dirtyFields } = formState;

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({ document: false }),
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading" ? "What’s the title?" : "",
        emptyEditorClass: "text-neutral-300 dark:text-neutral-500",
      }),
    ],
    content: getValues("note"),
    editable: editing,
    onUpdate: ({ editor }) => {
      setValue("note", editor.getHTML());
      trigger("note");
    },
  });

  const toggleEdit = useCallback(
    (enable: boolean) => {
      setEditing(enable);
      editor?.setEditable(enable);
    },
    [editor],
  );

  useEffect(() => {
    editor?.setEditable(editing);
  }, [editing, editor]);

  const { data: encryptedData, isLoading } = useGetNotesQuery(
    { slug: slug, token: accessToken },
    {
      skip: !accessToken || !slug,
    },
  );

  const { data, loading } = useDecryptedData(encryptedData, isLoading);

  useEffect(() => {
    if (data) {
      setValue("slug", data.slug);
      setValue("note", data.note);
      setValue("security", data.security);
      setValue("authtoken", data.authtoken);
      if (editor && data.note) {
        editor.commands.setContent(data.note);
        setEditing(false);
      }
    }
  }, [data]);

  const security = watch("security");
  const authtoken = watch("authtoken");

  const {
    data: encryptedUserData,
    isLoading: vaultloading,
    refetch: profilerefetch,
  } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken && !security },
  );

  const { data: userdata, loading: vaultLoader } = useDecryptedData(
    encryptedUserData,
    vaultloading,
  );

  useEffect(() => {
    if (userdata) {
      setUser(userdata);
    }
  }, [userdata, vaultLoader]);

  const onSubmitVaultPassword = useCallback(async () => {
    if (!accessToken) return;
    const toastId = toast.loading("Adding...", { position: "top-center" });
    await delay(500);
    try {
      const data = vaultPasswordForm.getValues();
      const res = await setvault({ data, token: accessToken });
      if (res.data) {
        toast.success("Added SuccessFull", {
          id: toastId,
          position: "top-center",
        });
        profilerefetch();
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const onTrash = async () => {
    if (!accessToken) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.success("Moving to Trash..", {
      id: toastId,
      position: "top-center",
    });
    await delay(500);
    try {
      const response = await trash({ slug, token: accessToken });
      if (response.data) {
        reset();
        toast.success("Moved", {
          id: toastId,
          position: "top-center",
        });
        refetch();
        if (editor) {
          editor.commands.setContent("");
        }
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onUpdate = async () => {
    const olddata = getValues();
    if (!accessToken) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);

    const parser = new DOMParser();
    const doc = parser.parseFromString(olddata.note!, "text/html");
    const h1Element = doc.querySelector("h1");
    const title = h1Element ? h1Element.textContent?.trim() || "" : "";

    if (!title) {
      toast.error("No <h1> tag found in the note!", { id: toastId });
      return;
    }

    setValue("title", title);

    const rawdata = getValues();
    const fieldsToCheck = ["note", "authtoken", "security", "title"] as const;

    const hasChanges = fieldsToCheck.some((key) => rawdata[key] !== data[key]);

    if (!hasChanges) {
      toast.error("No changes detected", {
        id: toastId,
        position: "top-center",
      });
      return;
    }

    if (user && !user?.vaultpassword) {
      toast.error("Vault password required to enablle it....", {
        id: toastId,
        position: "top-center",
      });
      return;
    }
    toast.success("Encrypting Data...", {
      id: toastId,
      position: "top-center",
    });
    const newData = encryptData(rawdata, accessToken);
    await delay(500);
    try {
      const response = await fetch("/api/vault/notes/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ data: newData }),
      });
      if (response.ok) {
        reset();
        toggleEdit(false);
        toast.success("Updated SuccessFull", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow overflow-auto">
        <EditorContent
          editor={editor}
          className="h-full overflow-auto w-full p-3 outline-none border-0 focus:outline-none"
        />
      </div>
      <div className="w-full h-auto">
        <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring">
          <Switch
            disabled={!editing}
            checked={security}
            onCheckedChange={(checked) => {
              setValue("security", checked);
            }}
            className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
          />

          <div className="grid grow gap-2">
            <Label htmlFor="checkbox-13">Vault password required</Label>
            <p className="text-xs text-muted-foreground">
              Always require your vault password before filling or accessing
              this login.
            </p>
          </div>
        </div>
        {user && !user?.vaultpassword && security && (
          <Form {...vaultPasswordForm}>
            <div className="flex gap-3 w-full items-center flex-col lg:flex-row p-4">
              <div className="space-y-2 relative w-full">
                <FormField
                  control={vaultPasswordForm.control}
                  name="vaultpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vault Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="vault Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => onSubmitVaultPassword()}
                  className="absolute right-0 hover:text-white"
                >
                  Set vault Password
                </Button>
              </div>
            </div>
          </Form>
        )}
        <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring mt-5">
          <Switch
            disabled={!editing}
            checked={authtoken}
            onCheckedChange={(checked) => {
              setValue("authtoken", checked);
            }}
            className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
          />
          <div className="grid grow gap-2">
            <Label htmlFor="checkbox-13">
              Authentication app Token required
            </Label>
            <p className="text-xs text-muted-foreground">
              Always require your authentication app token before filling or
              accessing this login.
            </p>
          </div>
        </div>
        <div className="relative flex w-full items-start gap-2 rounded-lg px-4 py-2 has-[[data-state=checked]]:border-ring">
          {!editing ? (
            <>
              <Button
                type="button"
                onClick={() => toggleEdit(true)}
                className="hover:text-white w-full"
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onTrash()}
                className="hover:text-white w-full"
              >
                Trash
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => onUpdate()}
                className="hover:text-white w-full"
              >
                Update
              </Button>
              <Button
                type="button"
                onClick={() => toggleEdit(false)}
                className="hover:text-white w-full"
                variant="secondary"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default NoteView;
