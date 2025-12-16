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
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-400 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 左侧目录 - 桌面端固定 */}
          <aside className="lg:w-72 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* 面包屑导航 */}
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
                <Link
                  href="/series"
                  className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  系列
                </Link>
                <span>/</span>
                <span className="text-zinc-900 dark:text-zinc-300">{series.title}</span>
              </div>

              {/* 系列标题 */}
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                {series.title}
              </h2>

              {/* 系列描述 */}
              {series.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  {series.description}
                </p>
              )}

              {/* 文章列表 */}
              <nav className="space-y-1">
                {allPosts.map((p, index) => {
                  const isActive = p.slug === decodedPostSlug
                  return (
                    <Link
                      key={p.slug}
                      href={`/series/${slug}/${encodeURIComponent(p.slug)}`}
                      className={`
                        block px-3 py-2 rounded-lg text-sm transition-colors
                        ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-300'
                        }
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 text-zinc-400 dark:text-zinc-600">
                          {index + 1}.
                        </span>
                        <span className="line-clamp-2">{p.title}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* 右侧内容区 */}
          <article className="flex-1 min-w-0">
            {/* 文章头部 */}
            <header className="mb-12">
              <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
                <time>{post.date}</time>
                <span>•</span>
                <span>
                  第 {currentIndex + 1} / {allPosts.length} 篇
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-lg text-zinc-600 dark:text-zinc-400">{post.description}</p>
              )}
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
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
