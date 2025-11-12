# Copilot 指令文档 - my-website

## 项目概述

这是一个使用 Next.js 16 构建的个人网站，采用 App Router 架构，使用 TypeScript、React 19 和 Tailwind CSS 4。通过 `create-next-app` 创建，部署在 Vercel 平台。

## 技术栈

- **框架**: Next.js 16.0.1（App Router）
- **React**: 19.2.0（最新版本，使用 JSX runtime）
- **样式**: Tailwind CSS 4.1.16 配合 PostCSS
- **包管理器**: pnpm
- **类型系统**: TypeScript 5.9.3，启用严格模式
- **字体**: Geist Sans 和 Geist Mono（通过 `next/font/google` 加载）

## 架构与结构

### App Router 模式

- 所有路由位于 `app/` 目录下
- `app/layout.tsx` - 根布局，包含字体配置和元数据
- `app/page.tsx` - 首页组件
- `app/globals.css` - 全局样式，包含 Tailwind 导入和 CSS 变量

### 路径别名

- `@/*` 映射到项目根目录（在 `tsconfig.json` 中配置）
- 示例：`import Component from '@/app/components/Component'`

## 开发工作流

### 常用命令

```bash
pnpm dev          # 启动开发服务器，访问 http://localhost:3000
pnpm build        # 生产环境构建
pnpm start        # 运行生产构建
pnpm lint         # 运行 ESLint 检查
```

### 热更新

- 编辑 `app/page.tsx` 或其他组件时，页面自动更新
- 修改 CSS/Tailwind 类时，样式即时生效

## 代码规范

### 样式编写方式

- **工具类优先**：直接在 JSX 中使用 Tailwind 类（如 `className="flex min-h-screen items-center"`）
- **深色模式**：使用 `dark:` 前缀（如 `dark:bg-black`）
- **CSS 变量**：主题色在 `globals.css` 中通过 `--background`、`--foreground` 定义
- **响应式**：移动端优先，使用 `sm:`、`md:` 等断点修饰符

### 组件模式

- **默认使用服务端组件**：除非必要，否则不添加 `"use client"` 指令
- **类型安全**：页面元数据使用 `next` 的 `Metadata` 类型
- **图片优化**：始终使用 `next/image` 组件（参考 `app/page.tsx`）
- **字体加载**：在 `layout.tsx` 中定义字体，通过 CSS 变量应用

### TypeScript 配置

- **启用严格模式**：所有类型检查均已启用
- **模块解析**：使用 `bundler`（非 node/node16）
- **JSX**：使用新的 `react-jsx` 转换（无需导入 React）
- **编译目标**：ES2017，适配现代浏览器

### Biome 设置

- 使用 Biome 作为代码格式化和静态分析工具

## 关键参考文件

- `app/page.tsx` - Image 使用示例、Tailwind 模式、响应式设计
- `app/layout.tsx` - 字体加载模式、元数据结构
- `app/globals.css` - CSS 变量主题、Tailwind 导入模式
- `tsconfig.json` - 路径别名配置

## 常见任务

### 添加新页面

1. 创建 `app/[路由]/page.tsx`
2. 导出默认函数组件
3. 可选：导出 `metadata` 对象用于 SEO

### 添加组件

- 在 `app/components/` 或功能相关目录中创建
- 除非需要交互性，否则使用服务端组件
- 使用 `@/` 别名导入

### 为新元素添加样式

- 优先使用 Tailwind 工具类
- 如需要，在 `globals.css` 中添加自定义 CSS 变量
- 使用 `dark:` 前缀支持深色模式

### 注意

任何工具都是用最新的版本
