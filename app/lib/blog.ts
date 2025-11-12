import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, PostMetadata } from '@/app/types/blog'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * 获取所有文章的元数据（不包含内容）
 * 用于文章列表页
 */
export function getAllPosts(): Array<PostMetadata & { slug: string }> {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        ...(data as PostMetadata),
      }
    })
    .filter((post) => !post.draft) // 过滤草稿
    .sort((a, b) => {
      // 按日期降序排序
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return allPostsData
}

/**
 * 根据 slug 获取单篇文章的完整内容
 * 返回原始 Markdown 内容，由客户端 react-markdown 渲染
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content, // 返回原始 Markdown
      ...(data as PostMetadata),
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

/**
 * 获取所有文章的 slug（用于生成静态路径）
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
