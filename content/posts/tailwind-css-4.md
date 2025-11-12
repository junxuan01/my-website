---
title: Tailwind CSS 4 新特性解析
date: 2025-11-07
description: 探索 Tailwind CSS 4 带来的革新特性，包括新的配置系统、原生 CSS 变量支持等。
tags: [CSS, Tailwind, 前端]
---

# Tailwind CSS 4 新特性解析

Tailwind CSS 4 是一次重大升级，带来了许多令人兴奋的新特性。

## 核心变化

### 1. 新的配置系统

Tailwind CSS 4 采用了全新的配置方式：

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

**优势：**
- 更接近原生 CSS
- 更好的 IDE 支持
- 类型提示更准确

### 2. 原生 CSS 变量

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

可以直接在 CSS 中定义和使用变量，无需 JavaScript 配置。

### 3. 零配置主题

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

深色模式支持更加简洁。

## 性能提升

- **构建速度提升 2-3 倍**
- **CSS 输出体积减少 30%**
- **开发服务器启动更快**

## 迁移指南

从 Tailwind CSS 3 迁移到 4：

1. 更新配置文件格式
2. 调整自定义主题定义
3. 检查插件兼容性

## 总结

Tailwind CSS 4 是一次重大升级，让样式开发更加高效和优雅。
