import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MarkdownProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = "" }: MarkdownProps) => {
  const [html, setHtml] = React.useState<string>("");

  // Configure marked options
  marked.setOptions({
    gfm: true, // Enable GitHub Flavored Markdown
    breaks: true, // Convert newlines to <br>
  });

  React.useEffect(() => {
    let isMounted = true;

    const parseMarkdown = async () => {
      try {
        const parsed = await marked.parse(content);
        if (isMounted) {
          setHtml(
            DOMPurify.sanitize(parsed, {
              ALLOWED_TAGS: [
                "p",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "strong",
                "em",
                "a",
                "ul",
                "ol",
                "li",
                "blockquote",
                "code",
                "pre",
                "img",
                "table",
                "thead",
                "tbody",
                "tr",
                "th",
                "td",
                "br",
                "hr",
              ],
              ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
            })
          );
        }
      } catch (error) {
        console.error("Error parsing markdown:", error);
        if (isMounted) {
          setHtml("<p>Error rendering content</p>");
        }
      }
    };

    parseMarkdown();

    return () => {
      isMounted = false;
    };
  }, [content]);

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;