'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  initialContent = '', 
  onContentChange 
}) => {
  // Editor state
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Configure marked
  const markedOptions = useMemo(() => ({
    gfm: true,
    breaks: true,
    silent: false,
  }), []);

  // Parse markdown to HTML
  const parseMarkdown = useCallback(async (markdown: string) => {
    try {
      marked.setOptions(markedOptions);
      const parsed = await marked.parse(markdown.trim() || ' ');
      
      return DOMPurify.sanitize(parsed, {
        ALLOWED_TAGS: [
          'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
          'strong', 'em', 'a', 'ul', 'ol', 'li',
          'blockquote', 'code', 'pre', 'img', 
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'br', 'hr'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class'],
      });
    } catch (err) {
      console.error('Error parsing markdown:', err);
      return '<div class="markdown-error">Error rendering preview</div>';
    }
  }, [markedOptions]);

  // Preview HTML state
  const [previewHtml, setPreviewHtml] = useState('');

  // Update preview when content or mode changes
  useEffect(() => {
    if (mode === 'preview' && isMounted) {
      parseMarkdown(content).then(html => {
        if (isMounted) setPreviewHtml(html);
      });
    }
  }, [content, mode, parseMarkdown, isMounted]);

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onContentChange) onContentChange(newContent);
  };

  // Toggle between edit and preview modes
  const toggleMode = () => {
    setMode(prev => prev === 'edit' ? 'preview' : 'edit');
  };

  return (
    <div className="markdown-editor-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {mode === 'edit' ? 'Markdown Editor' : 'Preview'}
        </h2>
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded ${
            mode === 'preview' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {mode === 'preview' ? 'Edit' : 'Preview'}
        </button>
      </div>

      {mode === 'edit' ? (
        <textarea
          className="w-full h-96 p-4 border border-gray-300 rounded font-mono"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your markdown here..."
        />
      ) : (
        <div 
          className="prose dark:prose-invert max-w-none p-4 border border-gray-300 rounded"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>
          {mode === 'edit' 
            ? 'Tip: Use markdown syntax to format your text' 
            : 'Preview mode - click Edit to make changes'}
        </p>
      </div>
    </div>
  );
};

export default MarkdownEditor;