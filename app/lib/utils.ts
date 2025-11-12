/**
 * 客户端安全的工具函数
 * 这些函数可以在客户端组件中使用
 */

/**
 * 格式化日期为中文格式（客户端版本）
 */
export function formatDate(dateString: string): string {
  if (!dateString) {
    return '日期未知'
  }

  try {
    const date = new Date(dateString)

    // 检查日期是否有效
    if (Number.isNaN(date.getTime())) {
      console.error(`Invalid date string: ${dateString}`)
      return dateString // 返回原始字符串
    }

    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error)
    return dateString
  }
}

/**
 * 计算阅读时间（估算）
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
