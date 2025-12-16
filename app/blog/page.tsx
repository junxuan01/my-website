import type { Metadata } from 'next'
import { FadeIn } from '@/app/components/MotionComponents'
import PostCard from '@/app/components/PostCard'
import { getAllPosts } from '@/app/lib/blog'

export const metadata: Metadata = {
  title: '博客 - GuoXiangwen',
  description: '分享技术文章、设计思考与学习笔记',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-400 mx-auto">
        {/* 页面标题 */}
        <FadeIn>
          <div className="mb-16 text-center">
            <h1 className="text-5xl sm:text-6xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              博客文章
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              记录学习、思考与成长的点滴
            </p>
          </div>
        </FadeIn>

        {/* 文章统计 */}
        <FadeIn delay={0.1}>
          <div className="mb-12 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              共{' '}
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">{posts.length}</span>{' '}
              篇文章
            </p>
          </div>
        </FadeIn>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <div className="text-center py-20">
              <p className="text-xl text-zinc-500 dark:text-zinc-500">暂无文章，敬请期待...</p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}
