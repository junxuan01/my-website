/**
 * 博客文章元数据类型定义
 */
export interface PostMetadata {
  title: string
  date: string
  description: string
  tags?: string[]
  cover?: string
  draft?: boolean
}

/**
 * 完整的文章类型（包含内容）
 */
export interface Post extends PostMetadata {
  slug: string
  content: string
}
