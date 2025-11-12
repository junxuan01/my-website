---
title: "React Markdown + Shiki 集成测试"
date: "2025-01-10"
description: "测试 react-markdown 和 Shiki 的语法高亮效果，展示各种 Markdown 特性"
tags: ["React", "Markdown", "Shiki", "测试"]
---

## 代码语法高亮测试

### TypeScript 示例

```typescript
interface User {
  id: number
  name: string
  email: string
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

### React 组件示例

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-2xl font-bold">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  )
}
```

### Python 示例

```python
def fibonacci(n: int) -> int:
    """计算斐波那契数列的第 n 项"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 测试
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## GitHub Flavored Markdown 特性

### 表格

| 特性 | react-markdown | marked |
|------|----------------|--------|
| 组件化 | ✅ | ❌ |
| 安全性 | ✅ | ⚠️ |
| 扩展性 | ✅ | ⚠️ |

### 任务列表

- [x] 安装 react-markdown
- [x] 配置 Shiki 高亮
- [x] 添加 GFM 支持
- [ ] 优化代码块样式
- [ ] 添加行号显示

### 删除线

~~这是被删除的文本~~

**这是加粗的文本**

*这是斜体的文本*

### 引用块

> "用专业的工具做专业的事。"
>
> react-markdown 是专门为 React 设计的 Markdown 渲染库，比直接使用 dangerouslySetInnerHTML 更安全、更灵活。

## 链接和图片

访问 [React 官网](https://react.dev) 了解更多信息。

## 列表嵌套

1. 第一层
   - 第二层 A
   - 第二层 B
     - 第三层 1
     - 第三层 2
2. 继续第一层
   - 又是第二层

## 内联代码

使用 `npm install` 或 `pnpm add` 安装依赖。

在 Next.js 16 中，你可以使用 `use client` 指令创建客户端组件。

---

## 总结

这个测试文件展示了：

1. ✨ **Shiki 语法高亮**：VS Code 级别的代码高亮
2. 📝 **GFM 扩展**：表格、任务列表、删除线
3. 🎨 **Tailwind 样式**：prose 类配合自定义样式
4. 🔗 **标题锚点**：自动生成的标题 ID
