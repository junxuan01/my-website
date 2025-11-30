import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/app/components/MarkdownContent'
import { getAllSeries, getSeriesBySlug, getSeriesPosts } from '@/app/lib/series'

interface SeriesPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const series = getAllSeries()
  return series.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params
  const series = getSeriesBySlug(slug)

  if (!series) {
    return { title: '系列不存在' }
  }

  return {
    title: `${series.title} - 系列文章`,
    description: series.description,
  }
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { slug } = await params
  const series = getSeriesBySlug(slug)

  if (!series) {
    notFound()
  }

  const posts = getSeriesPosts(slug)

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* 面包屑导航 */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link
            href="/series"
            className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
          >
            系列文章
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-300">{series.title}</span>
        </div>

        {/* 左右布局容器 */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 左侧目录 - 固定在左侧 */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28">
              {/* 系列标题和状态 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      series.status === 'updating'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {series.status === 'updating' ? '连载中' : '已完结'}
                  </span>
                  <span className="text-xs text-zinc-500">{posts.length} 篇文章</span>
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">章节目录</h2>
              </div>

              {/* 目录列表 */}
              <nav className="space-y-1">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/series/${series.slug}/${encodeURIComponent(post.slug)}`}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded text-xs font-medium group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* 右侧内容区 */}
          <main className="flex-1 min-w-0">
            {/* 系列头部信息 */}
            <header className="mb-10">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                {series.title}
              </h1>
              <div className="prose dark:prose-invert max-w-none">
                <MarkdownContent content={series.content} />
              </div>
            </header>

            {/* 章节卡片列表 */}
            <section>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                开始学习
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/series/${series.slug}/${encodeURIComponent(post.slug)}`}
                    className="group relative p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    {/* 序号标签 */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg text-sm font-bold shadow-md">
                      {index + 1}
                    </div>

                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                        {post.description}
                      </p>
                      <div className="flex items-center text-sm text-blue-500 font-medium">
                        <span>开始阅读</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
