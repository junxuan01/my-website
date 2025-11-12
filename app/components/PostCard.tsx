'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils'
import type { PostMetadata } from '@/app/types/blog'

interface PostCardProps {
  post: PostMetadata & { slug: string }
  index: number
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300"
      >
        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 标题 */}
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {post.title}
        </h3>

        {/* 描述 */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">{post.description}</p>

        {/* 日期 */}
        <time className="text-sm text-zinc-500 dark:text-zinc-500">{formatDate(post.date)}</time>
      </Link>
    </motion.div>
  )
}
