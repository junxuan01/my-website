import Link from 'next/link'
import { FadeIn, ScaleOnHover } from '@/app/components/MotionComponents'
import PostCard from '@/app/components/PostCard'
import { getAllPosts } from '@/app/lib/blog'

export default function Home() {
  // 使用 Server Component 直接获取数据 - React 19 最佳实践
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero Section - Apple 风格 */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              设计与代码
              <br />
              <span className="text-zinc-600 dark:text-zinc-400">的艺术结合</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              探索设计、技术与创意的无限可能
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScaleOnHover>
                <Link
                  href="/blog"
                  className="px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  查看文章
                </Link>
              </ScaleOnHover>

              <ScaleOnHover>
                <Link
                  href="/resume"
                  className="px-8 py-4 border-2 border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50 rounded-full font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  了解更多
                </Link>
              </ScaleOnHover>
            </div>
          </FadeIn>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-zinc-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 最新文章 */}
      {latestPosts.length > 0 && (
        <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    最新文章
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    记录学习、思考与成长的点滴
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
                >
                  查看全部
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
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 特色区块 */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-semibold text-center text-zinc-900 dark:text-zinc-50 mb-20">
              专注于细节
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.15}>
                <div className="text-center">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const features = [
  {
    icon: '✨',
    title: '设计驱动',
    description: '以用户体验为核心，打造优雅的视觉呈现',
  },
  {
    icon: '⚡',
    title: '性能优先',
    description: '极致优化，追求毫秒级的响应速度',
  },
  {
    icon: '🎯',
    title: '持续进化',
    description: '不断学习，探索技术与设计的前沿',
  },
]
