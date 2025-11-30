import Link from 'next/link'

const footerLinks = {
  产品: [
    { name: '博客', href: '/blog' },
    { name: '简历', href: '/resume' },
  ],
  社交: [
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-black">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-8">
        {/* 链接区域 */}
        <div className="grid grid-cols-2 gap-8 mb-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 版权信息 */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
            © {currentYear} GuoXiangwen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
