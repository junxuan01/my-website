import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/app/components/MarkdownContent'
import { getAllPostSlugs, getPostBySlug } from '@/app/lib/blog'
import { formatDate } from '@/app/lib/utils'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章不存在',
    }
  }

  return {
    title: `${post.title} - GuoXiangwen`,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <article className="max-w-5xl mx-auto">
        {/* 返回链接 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          返回博客列表
        </Link>

        {/* 文章头部 */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
            <time>{formatDate(post.date)}</time>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.description && (
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">{post.description}</p>
          )}
        </header>

        {/* 文章内容 */}
        <MarkdownContent content={post.content} />
      </article>
    </div>
  )
}
