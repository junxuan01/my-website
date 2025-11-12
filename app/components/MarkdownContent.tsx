'use client'

import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  a11yDark, // 可访问性深色
  atomDark, // Atom Dark
  dracula, // Dracula 主题
  materialDark, // Material Dark
  nightOwl, // Night Owl
  nord, // Nord 主题
  oneDark, // VS Code Dark+ 风格
  oneLight, // VS Code Light 风格
  solarizedlight, // Solarized Light
  tomorrow, // Tomorrow 主题
  vscDarkPlus, // VS Code Dark+
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  codeTheme?:
    | 'oneDark'
    | 'oneLight'
    | 'dracula'
    | 'materialDark'
    | 'tomorrow'
    | 'a11yDark'
    | 'atomDark'
    | 'nord'
    | 'nightOwl'
    | 'solarizedlight'
    | 'vscDarkPlus'
}

// 主题映射
const themeMap = {
  oneDark,
  oneLight,
  dracula,
  materialDark,
  tomorrow,
  a11yDark,
  atomDark,
  nord,
  nightOwl,
  solarizedlight,
  vscDarkPlus,
}

/**
 * Markdown 内容渲染组件
 * 使用 react-markdown + react-syntax-highlighter
 *
 * 可用主题风格：
 * - oneDark: VS Code 经典深色（默认）
 * - oneLight: VS Code 浅色
 * - dracula: Dracula 紫色调
 * - materialDark: Material Design 深色
 * - tomorrow: Tomorrow 清新风格
 * - a11yDark: 高对比度深色（可访问性优化）
 * - atomDark: Atom 编辑器深色
 * - nord: Nord 北欧风格
 * - nightOwl: Night Owl 夜猫子
 * - solarizedlight: Solarized 浅色
 * - vscDarkPlus: VS Code Dark+
 */
export default function MarkdownContent({ content, codeTheme = 'oneDark' }: MarkdownContentProps) {
  const components: Components = {
    // biome-ignore lint/suspicious/noExplicitAny: react-markdown 组件类型
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const isInline = !className

      return !isInline && language ? (
        <SyntaxHighlighter
          // biome-ignore lint/suspicious/noExplicitAny: react-syntax-highlighter 样式类型
          style={themeMap[codeTheme] as any}
          language={language}
          PreTag="div"
          showLineNumbers={false}
          wrapLines={false}
          customStyle={{
            margin: '2rem 0',
            borderRadius: '8px',
            padding: '1.5rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <article
      className="prose prose-zinc dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-6
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-200 dark:prose-h2:border-zinc-800 prose-h2:pb-2
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-lg prose-p:leading-8 prose-p:my-6 prose-p:text-zinc-700 dark:prose-p:text-zinc-300
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium
        prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-semibold
        prose-code:text-sm prose-code:font-mono prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
        prose-code:px-2 prose-code:py-1 prose-code:rounded-md
        prose-code:before:content-[''] prose-code:after:content-['']
        prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:text-zinc-700 dark:prose-li:text-zinc-300
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400
        prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8
        prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 prose-hr:my-12
        prose-table:border-collapse prose-table:w-full
        prose-th:border prose-th:border-zinc-300 dark:prose-th:border-zinc-700 prose-th:bg-zinc-50 dark:prose-th:bg-zinc-800 prose-th:px-4 prose-th:py-2 prose-th:font-semibold
        prose-td:border prose-td:border-zinc-300 dark:prose-td:border-zinc-700 prose-td:px-4 prose-td:py-2"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
