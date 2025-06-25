import { useState, useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { Markdown } from 'tiptap-markdown';
import DOMPurify from 'dompurify';

type RichTextEditorProps = {
  initialContent?: string;
  onSave: (content: { html: string; markdown: string; text: string }) => void;
};

const RichTextEditor = ({ initialContent = '', onSave }: RichTextEditorProps) => {
  const [mode, setMode] = useState('wysiwyg'); // 'wysiwyg', 'markdown', or 'preview'
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Youtube.configure({
        inline: false,
        controls: true,
      }),
      TextStyle,
      FontFamily,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Markdown.configure({
        html: true,
        breaks: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Sync content between modes
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addVideo = useCallback(() => {
    if (videoUrl && editor) {
      editor.commands.setYoutubeVideo({
        src: videoUrl,
      });
      setShowVideoModal(false);
      setVideoUrl('');
    }
  }, [editor, videoUrl]);

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.commands.setImage({ src: imageUrl });
      setShowImageModal(false);
      setImageUrl('');
    }
  }, [editor, imageUrl]);

  const handleSave = useCallback(() => {
    if (!editor) return;

    const htmlContent = editor.getHTML();
    const markdownContent = editor.storage.markdown.getMarkdown();
    const textContent = editor.getText();

    onSave({
      html: htmlContent,
      markdown: markdownContent,
      text: textContent,
    });
  }, [editor, onSave]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      {/* Mode Selector */}
      <div className="flex mb-4 border-b border-gray-200">
        <button
          onClick={() => setMode('wysiwyg')}
          className={`px-4 py-2 font-medium text-sm ${
            mode === 'wysiwyg'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Rich Text
        </button>
        <button
          onClick={() => setMode('markdown')}
          className={`px-4 py-2 font-medium text-sm ${
            mode === 'markdown'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Markdown
        </button>
        <button
          onClick={() => setMode('preview')}
          className={`px-4 py-2 font-medium text-sm ${
            mode === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Preview
        </button>
      </div>

      {/* WYSIWYG Mode */}
      {mode === 'wysiwyg' && (
        <>
          {/* Floating Format Menu */}
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex bg-white p-1 border border-gray-200 rounded shadow-lg">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1 mx-1 rounded ${
                    editor.isActive('bold') ? 'bg-gray-200' : ''
                  }`}
                  title="Bold"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1 mx-1 rounded ${
                    editor.isActive('italic') ? 'bg-gray-200' : ''
                  }`}
                  title="Italic"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-1 mx-1 rounded ${
                    editor.isActive('underline') ? 'bg-gray-200' : ''
                  }`}
                  title="Underline"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
                    />
                  </svg>
                </button>
                <button
                  onClick={setLink}
                  className={`p-1 mx-1 rounded ${
                    editor.isActive('link') ? 'bg-gray-200' : ''
                  }`}
                  title="Link"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                    />
                  </svg>
                </button>
              </div>
            </BubbleMenu>
          )}

          {/* Toolbar */}
          <div className="w-full border border-gray-200 rounded-lg bg-gray-50 mb-2">
            <div className="flex flex-wrap items-center gap-1 p-2">
              {/* Text Formatting */}
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('bold') ? 'bg-gray-200' : ''
                }`}
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('italic') ? 'bg-gray-200' : ''
                }`}
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('underline') ? 'bg-gray-200' : ''
                }`}
                title="Underline"
              >
                <u>U</u>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('strike') ? 'bg-gray-200' : ''
                }`}
                title="Strikethrough"
              >
                <s>S</s>
              </button>

              {/* Headings */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'paragraph') {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: parseInt(value) as 1 | 2 | 3 })
                      .run();
                  }
                }}
                value={
                  editor.isActive('heading', { level: 1 })
                    ? '1'
                    : editor.isActive('heading', { level: 2 })
                    ? '2'
                    : editor.isActive('heading', { level: 3 })
                    ? '3'
                    : 'paragraph'
                }
                className="p-2 border rounded bg-white"
              >
                <option value="paragraph">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>

              {/* Lists */}
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('bulletList') ? 'bg-gray-200' : ''
                }`}
                title="Bullet List"
              >
                • List
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('orderedList') ? 'bg-gray-200' : ''
                }`}
                title="Numbered List"
              >
                1. List
              </button>

              {/* Alignment */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                }`}
                title="Align Left"
              >
                ≡
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                }`}
                title="Align Center"
              >
                ≡
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                }`}
                title="Align Right"
              >
                ≡
              </button>

              {/* Media */}
              <button
                onClick={() => setShowImageModal(true)}
                className="p-2 rounded hover:bg-gray-200"
                title="Insert Image"
              >
                Image
              </button>
              <button
                onClick={() => setShowVideoModal(true)}
                className="p-2 rounded hover:bg-gray-200"
                title="Insert Video"
              >
                Video
              </button>

              {/* Table */}
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                className="p-2 rounded hover:bg-gray-200"
                title="Insert Table"
              >
                Table
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="border border-gray-200 rounded-lg p-4 min-h-[300px] bg-white">
            <EditorContent editor={editor} />
          </div>
        </>
      )}

      {/* Markdown Mode */}
      {mode === 'markdown' && (
        <div className="border border-gray-200 rounded-lg">
          <textarea
            className="w-full p-4 min-h-[300px] font-mono text-sm"
            value={editor.storage.markdown.getMarkdown()}
            onChange={(e) => {
              editor.commands.setContent(e.target.value);
            }}
            placeholder="Write your markdown here..."
          />
        </div>
      )}

      {/* Preview Mode */}
      {mode === 'preview' && (
        <div
          className="prose max-w-none p-4 border border-gray-200 rounded-lg"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(editor.getHTML()),
          }}
        />
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addVideo}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Content
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;