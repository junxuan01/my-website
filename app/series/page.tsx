import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSeries } from '@/app/lib/series'

export const metadata: Metadata = {
  title: '系列文章 - GuoXiangwen',
  description: '系统化的技术学习路线与专栏',
}

export default function SeriesListPage() {
  const allSeries = getAllSeries()

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题区 */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            系列文章
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            系统化的技术学习路线，循序渐进掌握核心知识
          </p>
        </header>

        {/* 系列卡片网格 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allSeries.map((series) => (
            <Link
              key={series.slug}
              href={`/series/${series.slug}`}
              className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              {/* 顶部装饰条 */}
              <div className="h-1.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

              <div className="flex flex-col h-full p-6">
                {/* 状态和日期 */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      series.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}
                  >
                    {series.status === 'completed' ? '✓ 已完结' : '⏳ 连载中'}
                  </span>
                  <time className="text-xs text-zinc-400 dark:text-zinc-500">{series.date}</time>
                </div>

                {/* 图标和标题 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl">
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
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {series.title}
                  </h2>
                </div>

                {/* 描述 */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 grow">
                  {series.description}
                </p>

                {/* 底部操作区 */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    <svg
                      className="w-4 h-4 inline-block mr-1 -mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    系列专栏
                  </span>
                  <span className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                    查看系列
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
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {allSeries.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400">暂无系列文章</p>
          </div>
        )}
      </div>
    </div>
  )
}
