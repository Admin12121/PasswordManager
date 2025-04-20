import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import "./style.css";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default function NoteEditor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }
          return "Can you add some further context?";
        },
        emptyEditorClass: "text-neutral-300 dark:text-neutral-500",
      }),
    ],
  });

  return (
    <EditorContent
      editor={editor}
      className=" h-[440px] w-full p-3 outline-none border-0 focus:border-0 focus:outline-none focus:ring-0"
    />
  );
}
