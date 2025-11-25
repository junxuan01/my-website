import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/app/components/MarkdownContent'
import {
  getAllSeries,
  getSeriesBySlug,
  getSeriesPostBySlug,
  getSeriesPosts,
} from '@/app/lib/series'

interface SeriesPostPageProps {
  params: Promise<{
    slug: string // series slug
    postSlug: string // post slug
  }>
}

export async function generateStaticParams() {
  const allSeries = getAllSeries()
  const params = []

  for (const series of allSeries) {
    const posts = getSeriesPosts(series.slug)
    for (const post of posts) {
      params.push({
        slug: series.slug,
        postSlug: post.slug,
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: SeriesPostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params
  const decodedPostSlug = decodeURIComponent(postSlug)
  const post = getSeriesPostBySlug(slug, decodedPostSlug)
  const series = getSeriesBySlug(slug)

  if (!post || !series) {
    return { title: '文章不存在' }
  }

  return {
    title: `${post.title} - ${series.title}`,
    description: post.description,
  }
}

export default async function SeriesPostPage({ params }: SeriesPostPageProps) {
  const { slug, postSlug } = await params
  // URL 解码 postSlug 以支持中文文件名
  const decodedPostSlug = decodeURIComponent(postSlug)
  const post = getSeriesPostBySlug(slug, decodedPostSlug)
  const series = getSeriesBySlug(slug)

  if (!post || !series) {
    notFound()
  }

  // 计算上一篇/下一篇
  const allPosts = getSeriesPosts(slug)
  const currentIndex = allPosts.findIndex((p) => p.slug === decodedPostSlug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen py-24 px-6">
      <article className="max-w-4xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between text-sm text-zinc-500 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Link
              href="/series"
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              系列
            </Link>
            <span>/</span>
            <Link
              href={`/series/${slug}`}
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              {series.title}
            </Link>
          </div>
          <div className="hidden sm:block">
            第 {currentIndex + 1} / {allPosts.length} 篇
          </div>
        </div>

        {/* 文章头部 */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
            <time>{post.date}</time>
          </div>
        </header>

        {/* 文章内容 */}
        <MarkdownContent content={post.content} />

        {/* 底部导航 */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 上一篇 */}
            {prevPost ? (
              <Link
                href={`/series/${slug}/${encodeURIComponent(prevPost.slug)}`}
                className="group flex flex-col p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <span className="text-sm text-zinc-500 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  ← 上一篇
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div /> // 占位
            )}

            {/* 下一篇 */}
            {nextPost ? (
              <Link
                href={`/series/${slug}/${encodeURIComponent(nextPost.slug)}`}
                className="group flex flex-col items-end p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-right"
              >
                <span className="text-sm text-zinc-500 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  下一篇 →
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/series/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              返回目录
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
