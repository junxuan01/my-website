---
title: Biome 配置最佳实践
date: 2025-11-06
description: 使用 Biome 替代 ESLint 和 Prettier，打造极速的代码格式化和 Lint 工作流。
tags: [工具, Biome, 开发效率]
---

# Biome 配置最佳实践

Biome 是新一代的 JavaScript/TypeScript 工具链，速度比 ESLint + Prettier 快 25-100 倍。

## 为什么选择 Biome

### 性能对比

| 工具 | 格式化时间 | Lint 时间 |
|------|----------|----------|
| Prettier | 1.2s | - |
| ESLint | - | 3.5s |
| **Biome** | **0.05s** ⚡ | **0.3s** ⚡ |

### 统一工具链

```bash
# 之前需要多个工具
npm install eslint prettier @typescript-eslint/parser ...

# 现在只需要一个
pnpm add -D @biomejs/biome
```

## 配置指南

### 基础配置

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.4/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### VS Code 集成

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

## 实用命令

```bash
# 格式化代码
biome format --write .

# Lint 检查
biome lint .

# 完整检查（格式化 + Lint）
biome check --write .
```

## 最佳实践

1. **保存时自动格式化**
2. **Git hooks 集成**
3. **CI/CD 流程集成**

## 总结

Biome 是现代 JavaScript 项目的理想选择，速度快、配置简单、功能强大。
