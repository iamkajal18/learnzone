"use client";
import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-t-md p-2 bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
      >
        List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
      >
        Ordered
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setLink({ href: "" }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link") ? "bg-gray-200" : ""
        }`}
      >
        Link
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className="p-2 rounded hover:bg-gray-200"
      >
        Unlink
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-200"
      >
        Image
      </button>
    </div>
  );
}