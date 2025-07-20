"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Youtube from "@tiptap/extension-youtube";
import Dropcursor from "@tiptap/extension-dropcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { lowlight } from "lowlight";
import DOMPurify from "dompurify";
import Turndown from "turndown";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [mode, setMode] = useState("wysiwyg");
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Theme colors based on #0286a3
  const themeColors = {
    primary: "#0286a3",
    primaryLight: "#e6f7fb",
    primaryDark: "#01687e",
    accent: "#ff9e4f",
    background: "#f8fdff"
  };

  // Define category groups with similar categories together
  const categoryGroups = {
    Programming: ["Technology", "Data Science", "Java", "Python"],
    Lifestyle: ["Lifestyle"],
    Education: ["Education"],
    Health: ["Health"],
    Other: ["Other"],
  };

  const fontFamilies = [
    { name: "Default", value: "" },
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Helvetica", value: "Helvetica, sans-serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
    { name: "Courier New", value: "Courier New, monospace" },
    { name: "Impact", value: "Impact, sans-serif" },
    { name: "Comic Sans MS", value: "Comic Sans MS, cursive" },
    { name: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  ];

  const colors = [
    "#0286a3", "#000000", "#333333", "#666666", "#999999", "#cccccc",
    "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff",
    "#00ffff", "#ff8000", "#8000ff", "#ff0080", "#80ff00",
    "#0080ff", "#ff4000", "#4000ff", "#ff0040", "#40ff00",
  ];

  const turndownService = useMemo(() => {
    const service = new Turndown({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*",
      strongDelimiter: "**",
      linkStyle: "inlined",
    });
    service.addRule("fencedCodeBlock", {
      filter: ["pre"],
      replacement: (content, node) => {
        const codeNode = node.querySelector("code");
        const language = codeNode?.className?.replace("language-", "") || "";
        return `\n\`\`\`${language}\n${codeNode?.textContent || content}\n\`\`\`\n`;
      },
    });
    service.addRule("images", {
      filter: "img",
      replacement: (_, node) => {
        const alt = node.getAttribute("alt") || "";
        const src = node.getAttribute("src") || "";
        return `![${alt}](${src})`;
      },
    });
    service.addRule("tables", {
      filter: ["table"],
      replacement: (_, node) => {
        const rows = Array.from(node.querySelectorAll("tr"));
        let output = "";
        if (rows.length > 0) {
          const headers = Array.from(rows[0].querySelectorAll("th, td"));
          output += headers.map((cell) => cell.textContent).join(" | ") + "\n";
          output += headers.map(() => "---").join(" | ") + "\n";
          for (let i = 1; i < rows.length; i++) {
            const cells = Array.from(rows[i].querySelectorAll("td"));
            output += cells.map((cell) => cell.textContent).join(" | ") + "\n";
          }
        }
        return output + "\n";
      },
    });
    return service;
  }, []);

  const debouncedSetMode = useCallback(debounce((newMode) => setMode(newMode), 100), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ fontFamily: false }),
      Image.configure({ inline: true, allowBase64: true }),
      Underline,
      TextStyle,
      FontFamily.configure({ types: ["textStyle"] }),
      Color.configure({ types: [TextStyle.name] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write something amazing..." }),
      CharacterCount.configure({ limit: 10000 }),
      Youtube.configure({ inline: false, controls: true }),
      Dropcursor,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-base xl:prose-lg m-5 focus:outline-none min-h-[400px] p-4 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-b-lg",
      },
    },
    onUpdate: ({ editor }) => {
      if (mode === "wysiwyg" && !editor.isDestroyed) {
        try {
          const html = editor.getHTML();
          const markdown = turndownService.turndown(html);
          setMarkdownContent(markdown);
        } catch (error) {
          console.error("Error updating markdown content:", error);
          setError("Failed to update editor content.");
        }
      }
    },
    immediate: mode === "wysiwyg",
  });

  useEffect(() => {
    let isMounted = true;
    if (mode === "wysiwyg" && editor && !editor.isDestroyed && markdownContent) {
      try {
        marked.parse(markdownContent, (err, html) => {
          if (!err && editor && !editor.isDestroyed && isMounted) {
            const sanitized = DOMPurify.sanitize(html);
            editor.commands.setContent(sanitized);
          }
        });
      } catch (error) {
        console.error("Error syncing markdown to editor:", error);
        setError("Failed to sync markdown content.");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [mode, editor, markdownContent]);

  useEffect(() => {
    setShowFontDropdown(false);
    setShowColorPicker(false);
    if (mode !== "wysiwyg" && editor && !editor.isDestroyed) {
      try {
        const html = editor.getHTML();
        const markdown = turndownService.turndown(html);
        setMarkdownContent(markdown);
        editor.destroy();
      } catch (error) {
        console.error("Error saving content on mode switch:", error);
        setError("Failed to switch editor mode.");
      }
    }
  }, [mode, editor, turndownService]);

  const setLink = useCallback(() => {
    if (!editor || editor.isDestroyed) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!/^(https?:\/\/)/.test(url)) {
      setError("Invalid URL. Please use http:// or https://");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setError("");
  }, [editor]);

  const addImageToEditor = useCallback(() => {
    if (!editor || editor.isDestroyed || !inlineImageUrl) return;
    if (!/^(https?:\/\/)/.test(inlineImageUrl)) {
      setError("Invalid image URL. Please use http:// or https://");
      return;
    }
    editor.commands.setImage({ src: inlineImageUrl });
    setShowImageModal(false);
    setInlineImageUrl("");
    setError("");
  }, [editor, inlineImageUrl]);

  const addVideoToEditor = useCallback(() => {
    if (!editor || editor.isDestroyed || !videoUrl) return;
    if (!/^(https?:\/\/(www\.)?(youtube\.com|youtu\.be))/.test(videoUrl)) {
      setError("Invalid YouTube URL.");
      return;
    }
    editor.commands.setYoutubeVideo({ src: videoUrl });
    setShowVideoModal(false);
    setVideoUrl("");
    setError("");
  }, [editor, videoUrl]);

  const changeFontFamily = useCallback((fontFamily) => {
    if (!editor || editor.isDestroyed) return;
    try {
      if (fontFamily === "") {
        editor.chain().focus().unsetFontFamily().run();
      } else {
        editor.chain().focus().setFontFamily(fontFamily).run();
      }
      setShowFontDropdown(false);
    } catch (error) {
      console.error("Error changing font family:", error);
      setError("Failed to change font family.");
    }
  }, [editor]);

  const changeTextColor = useCallback((color) => {
    if (!editor || editor.isDestroyed) return;
    try {
      editor.chain().focus().setColor(color).run();
      setShowColorPicker(false);
    } catch (error) {
      console.error("Error changing text color:", error);
      setError("Failed to change text color.");
    }
  }, [editor]);

  const convertEditorContentToMarkdown = () => {
    if (editor && !editor.isDestroyed) {
      try {
        const html = editor.getHTML();
        const markdown = turndownService.turndown(html);
        setMarkdownContent(markdown);
        debouncedSetMode("markdown");
      } catch (error) {
        console.error("Error converting to markdown:", error);
        setError("Failed to convert to markdown.");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!session?.user?.id) {
      setError("You must be logged in to create a blog post.");
      setIsSubmitting(false);
      return;
    }

    try {
      const content = mode === "markdown" ? markdownContent : editor?.getHTML() || "";
      const contentType = mode === "markdown" ? "markdown" : "html";
      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);

      const response = await axios.post("/api/add-blog", {
        title,
        content,
        imageUrl,
        contentType,
        category,
        tags: tagsArray,
        createdBy: session.user.id,
      });

      if (response.status === 201) {
        router.push("/");
      } else {
        setError(response.data.message || "Failed to create blog post.");
      }
    } catch (error) {
      console.error("Error in submitHandler:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        (error.response?.data?.errors?.join("; ") ?? "Failed to create blog post.");
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === "wysiwyg" && !editor) {
    return <div className="flex justify-center items-center h-screen">Loading editor...</div>;
  }

  return (
    <div className="flex justify-center p-4" style={{ background: themeColors.background }}>
      <div className="w-full max-w-4xl">
        {/* Header with theme color */}
        <div className="mb-8 p-6 rounded-lg" style={{ background: themeColors.primary }}>
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create Your Masterpiece
          </h2>
          <p className="text-white/90 text-center">Share your knowledge with the world</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Blog Title"
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Blog Title"
            />

            {/* Category Input with Groups */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
                required
                aria-label="Category"
              >
                <option value="">Select a category</option>
                {Object.entries(categoryGroups).map(([group, categories]) => (
                  <optgroup key={group} label={group}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="Enter tags (e.g., tech, coding, javascript)"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                aria-label="Tags"
              />
            </div>

            <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => debouncedSetMode("wysiwyg")}
                className={`px-4 py-2 font-medium text-sm ${
                  mode === "wysiwyg" 
                    ? "text-[#0286a3] border-b-2 border-[#0286a3]" 
                    : "text-gray-500 hover:text-[#0286a3]"
                }`}
                aria-label="Switch to Rich Text mode"
              >
                Rich Text
              </button>
              <button
                type="button"
                onClick={() => debouncedSetMode("preview")}
                className={`px-4 py-2 font-medium text-sm ${
                  mode === "preview" 
                    ? "text-[#0286a3] border-b-2 border-[#0286a3]" 
                    : "text-gray-500 hover:text-[#0286a3]"
                }`}
                aria-label="Switch to Preview mode"
              >
                Preview
              </button>
              {mode === "wysiwyg" && (
                <button
                  type="button"
                  onClick={convertEditorContentToMarkdown}
                  className="ml-auto px-4 py-2 text-sm text-[#0286a3] hover:bg-[#e6f7fb] rounded-md"
                  aria-label="Convert to Markdown"
                >
                  Convert to Markdown
                </button>
              )}
            </div>

            {mode === "wysiwyg" && editor && (
              <>
                <div className="w-full border rounded-lg bg-gray-50 mb-2">
                  <div className="flex flex-wrap items-center gap-2 p-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowFontDropdown(!showFontDropdown)}
                        className="p-2 rounded hover:bg-gray-200 border bg-white min-w-[120px] text-left"
                        title="Font Family"
                      >
                        {editor.getAttributes("textStyle").fontFamily
                          ? fontFamilies.find((f) => f.value === editor.getAttributes("textStyle").fontFamily)?.name || "Custom"
                          : "Default"}
                        <span className="ml-2">▼</span>
                      </button>
                      {showFontDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[200px]">
                          {fontFamilies.map((font) => (
                            <button
                              key={font.name}
                              type="button"
                              onClick={() => changeFontFamily(font.value)}
                              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                              style={{ fontFamily: font.value }}
                            >
                              {font.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="p-2 rounded hover:bg-gray-200 border bg-white"
                        title="Text Color"
                      >
                        <span
                          className="inline-block w-4 h-4 border rounded"
                          style={{ backgroundColor: editor.getAttributes("textStyle").color || "#000000" }}
                        ></span>
                        <span className="ml-1">A</span>
                      </button>
                      {showColorPicker && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 p-2">
                          <div className="grid grid-cols-5 gap-1">
                            {colors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => changeTextColor(color)}
                                className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => changeTextColor("#000000")}
                            className="mt-2 px-2 py-1 text-xs bg-gray-100 rounded w-full"
                          >
                            Reset Color
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleUnderline().run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
                      title="Underline"
                    >
                      <u>U</u>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHighlight().run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("highlight") ? "bg-gray-200" : ""}`}
                      title="Highlight"
                    >
                      🖍️
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImageModal(true)}
                      className="p-2 rounded hover:bg-gray-200"
                      title="Insert Image"
                    >
                      🖼️
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVideoModal(true)}
                      className="p-2 rounded hover:bg-gray-200"
                      title="Insert Video"
                    >
                      🎥
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign("left").run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
                      title="Align Left"
                    >
                      ⬅️
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign("center").run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
                      title="Align Center"
                    >
                      ↔️
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign("right").run()}
                      className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
                      title="Align Right"
                    >
                      ➡️
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg min-h-[400px]">
                  <EditorContent editor={editor} />
                </div>

                {editor && !editor.isDestroyed && (
                  <div className="text-sm text-gray-500 text-right">
                    {editor.storage.characterCount.characters()}/{editor.options.extensions.find((ext) => ext.name === "characterCount")?.options.limit || 10000} characters
                  </div>
                )}
              </>
            )}

            {mode === "markdown" && (
              <div className="flex flex-col space-y-4">
                <textarea
                  className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Write in markdown format..."
                  aria-label="Markdown editor"
                />
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              </div>
            )}

            {mode === "preview" && (
              <div className="prose max-w-none p-4 border rounded-lg">
                {mode === "preview" && editor && !editor.isDestroyed ? (
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(editor.getHTML()) }} />
                ) : (
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                )}
              </div>
            )}

            {showImageModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    className="w-full p-2 border rounded mb-4"
                    value={inlineImageUrl}
                    onChange={(e) => setInlineImageUrl(e.target.value)}
                    aria-label="Image URL"
                  />
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{ sources: ["local"], multiple: false, maxFiles: 1 }}
                    onSuccess={(result) => {
                      const url = result?.info?.secure_url || "";
                      if (url) {
                        setInlineImageUrl(url);
                        setError("");
                      } else {
                        setError("Image upload failed.");
                      }
                    }}
                    onError={() => setError("Image upload failed.")}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full p-2 bg-gray-200 rounded mb-4"
                        aria-label="Upload image"
                      >
                        Upload Image
                      </button>
                    )}
                  </CldUploadWidget>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowImageModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded"
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addImageToEditor}
                      className="px-4 py-2 bg-[#0286a3] text-white rounded"
                      aria-label="Insert image"
                    >
                      Insert
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showVideoModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
                  <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="w-full p-2 border rounded mb-4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    aria-label="YouTube video URL"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowVideoModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded"
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addVideoToEditor}
                      className="px-4 py-2 bg-[#0286a3] text-white rounded"
                      aria-label="Insert video"
                    >
                      Insert
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Featured Image (optional)</label>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{ sources: ["local"], multiple: false, maxFiles: 1 }}
                onSuccess={(result) => {
                  const url = result?.info?.secure_url || "";
                  if (url) {
                    setImageUrl(url);
                    setError("");
                  } else {
                    setError("Image upload failed.");
                  }
                }}
                onError={() => setError("Image upload failed.")}
              >
                {({ open }) => (
                  <>
                    <button
                      type="button"
                      onClick={() => open()}
                      className="bg-[#e6f7fb] text-[#0286a3] px-4 py-2 rounded-md hover:bg-[#d0eef5] transition-colors"
                      aria-label={imageUrl ? "Change featured image" : "Upload featured image"}
                    >
                      {imageUrl ? "Change Featured Image" : "Upload Featured Image"}
                    </button>
                    {imageUrl && (
                      <img
                        src={imageUrl.replace("/upload/", "/upload/w_150,h_100,c_fill,q_auto,f_auto/")}
                        alt="Featured image preview"
                        className="mt-2 max-h-40 rounded-md object-cover"
                      />
                    )}
                  </>
                )}
              </CldUploadWidget>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || (mode === "wysiwyg" && !editor)}
              className={`bg-[#0286a3] text-white mt-4 px-4 py-2 rounded-md hover:bg-[#01687e] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Publish blog post"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : "Publish Blog Post"}
            </button>
          </form>
        </div>

        {(showFontDropdown || showColorPicker) && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => {
              setShowFontDropdown(false);
              setShowColorPicker(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Page;