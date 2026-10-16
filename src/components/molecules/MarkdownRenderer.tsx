import React, { useMemo } from 'react';
import { marked } from 'marked';

export interface MarkdownRendererProps {
  content: string;
  articleTitle?: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  articleTitle,
  className = '',
}) => {
  const processedContent = useMemo(() => {
    if (!content) return '';

    let cleaned = content.trim();

    if (articleTitle) {
      const normTitle = articleTitle.toLowerCase().trim();
      const firstLineMatch = cleaned.match(/^#\s+(.+)$/m);
      if (firstLineMatch) {
        const h1Text = firstLineMatch[1].toLowerCase().trim();
        if (normTitle.includes(h1Text) || h1Text.includes(normTitle)) {
          cleaned = cleaned.replace(/^#\s+.+\n?/, '').trim();
        }
      }
    }

    return cleaned;
  }, [content, articleTitle]);

  const html = useMemo(() => {
    if (!processedContent) return '';
    try {
      return marked.parse(processedContent, {
        gfm: true,
        breaks: true,
      }) as string;
    } catch (err) {
      console.error('Error al parsear markdown:', err);
      return processedContent;
    }
  }, [processedContent]);

  return (
    <div className={`relative ${className}`}>
      <div
        className="markdown-body text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
