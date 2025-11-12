'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

/**
 * Markdown 内容渲染组件
 * 使用掘金主题的原生样式，不自定义代码高亮
 */
export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
