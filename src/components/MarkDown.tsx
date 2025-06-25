// src/components/MarkDown.jsx
import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MarkdownProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownProps) => {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    const parseResult = marked.parse(content);
    if (typeof parseResult === "string") {
      setHtml(DOMPurify.sanitize(parseResult));
    } else if (parseResult instanceof Promise) {
      parseResult.then((result) => {
        setHtml(DOMPurify.sanitize(result));
      });
    }
  }, [content]);

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;