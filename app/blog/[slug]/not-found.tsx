import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">404</h1>
        <p className="text-2xl text-zinc-600 dark:text-zinc-400 mb-8">文章不存在</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          返回博客列表
        </Link>
      </div>
    </div>
  )
}
