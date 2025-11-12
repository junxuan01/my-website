import MarkdownContent from '@/app/components/MarkdownContent'

const sampleCode = `
## 代码主题预览

下面展示不同主题的代码高亮效果：

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}

// 使用示例
const user = await fetchUser(1)
console.log(user.name)
\`\`\`

\`\`\`python
def fibonacci(n: int) -> int:
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 测试
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`
`

const themes = [
  { name: 'One Dark', value: 'oneDark', desc: 'VS Code 经典深色（默认推荐）' },
  { name: 'One Light', value: 'oneLight', desc: 'VS Code 浅色' },
  { name: 'Dracula', value: 'dracula', desc: 'Dracula 紫色调' },
  { name: 'Material Dark', value: 'materialDark', desc: 'Material Design 深色' },
  { name: 'Tomorrow', value: 'tomorrow', desc: 'Tomorrow 清新风格' },
  { name: 'A11y Dark', value: 'a11yDark', desc: '高对比度深色（可访问性优化）' },
  { name: 'Atom Dark', value: 'atomDark', desc: 'Atom 编辑器深色' },
  { name: 'Nord', value: 'nord', desc: 'Nord 北欧风格（推荐）' },
  { name: 'Night Owl', value: 'nightOwl', desc: 'Night Owl 夜猫子' },
  { name: 'Solarized Light', value: 'solarizedlight', desc: 'Solarized 浅色' },
  { name: 'VS Code Dark+', value: 'vscDarkPlus', desc: 'VS Code Dark+（推荐）' },
] as const

export default function ThemePreview() {
  return (
    <div className="min-h-screen py-24 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            代码高亮主题预览
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">选择你喜欢的代码块风格</p>
        </header>

        <div className="space-y-16">
          {themes.map((theme) => (
            <section
              key={theme.value}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  {theme.name}
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">{theme.desc}</p>
                <code className="inline-block mt-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-sm">
                  codeTheme="{theme.value}"
                </code>
              </div>
              {/* biome-ignore lint/suspicious/noExplicitAny: 主题类型转换 */}
              <MarkdownContent content={sampleCode} codeTheme={theme.value as any} />
            </section>
          ))}
        </div>

        <footer className="mt-16 text-center text-zinc-600 dark:text-zinc-400">
          <p className="mb-4">
            在{' '}
            <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">MarkdownContent</code>{' '}
            组件中传入{' '}
            <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">codeTheme</code>{' '}
            属性即可切换主题
          </p>
          <p className="text-sm">
            示例：
            <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
              &lt;MarkdownContent content=&#123;post.content&#125; codeTheme="nord" /&gt;
            </code>
          </p>
        </footer>
      </div>
    </div>
  )
}
