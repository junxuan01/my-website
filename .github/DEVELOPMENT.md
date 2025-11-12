# 开发文档

## Biome 配置

本项目使用 Biome 作为代码格式化和 lint 工具。

### 命令

```bash
# 格式化代码
pnpm format

# 格式化并写入文件
pnpm format:write

# Lint 检查
pnpm lint

# Lint 检查并自动修复
pnpm lint:fix

# 运行完整检查（格式化 + Lint）
pnpm check

# 运行完整检查并自动修复
pnpm check:write
```

### VS Code 配置

项目已配置 `.vscode/settings.json`，会自动：
- 保存时格式化
- 保存时整理导入
- 使用 Biome 作为默认格式化工具

### 推荐的 VS Code 扩展

项目根目录 `.vscode/extensions.json` 中推荐安装：
- **Biome** - 代码格式化和 Lint
- **Tailwind CSS IntelliSense** - Tailwind 类名提示
- **GitHub Copilot** - AI 代码助手

### 代码规范

- **Node.js 模块导入**：必须使用 `node:` 协议
  ```typescript
  // ✅ 正确
  import fs from 'node:fs'
  import path from 'node:path'
  
  // ❌ 错误
  import fs from 'fs'
  import path from 'path'
  ```

- **引号风格**：
  - JavaScript/TypeScript: 单引号
  - JSX 属性: 双引号
  
- **分号**：根据需要自动添加（asNeeded）

- **缩进**：2 个空格

- **行宽**：100 字符

## 开发流程

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动开发服务器：
   ```bash
   pnpm dev
   ```

3. 代码检查和格式化：
   ```bash
   pnpm check:write
   ```

4. 构建生产版本：
   ```bash
   pnpm build
   ```
