'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: '首页', href: '/' },
  { name: '博客', href: '/blog' },
  { name: '系列', href: '/series' },
  { name: '简历', href: '/resume' },
  { name: '联系', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl backdrop-saturate-150 border-b border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
      <nav className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            GuoXiangwen
          </Link>

          {/* 导航链接 */}
          <div className="flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
