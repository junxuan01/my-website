import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Series, SeriesMetadata, SeriesPost, SeriesPostMetadata } from '@/app/types/series'

const seriesDirectory = path.join(process.cwd(), 'content/series')

/**
 * 获取所有系列列表
 */
export function getAllSeries(): Series[] {
  if (!fs.existsSync(seriesDirectory)) {
    return []
  }

  const seriesSlugs = fs.readdirSync(seriesDirectory).filter((file) => {
    return fs.statSync(path.join(seriesDirectory, file)).isDirectory()
  })

  const allSeries = seriesSlugs
    .map((slug) => {
      return getSeriesBySlug(slug)
    })
    .filter((series): series is Series => series !== null)

  return allSeries.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * 获取单个系列详情（读取 index.md）
 */
export function getSeriesBySlug(slug: string): Series | null {
  try {
    const fullPath = path.join(seriesDirectory, slug, 'index.md')
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as SeriesMetadata),
    }
  } catch (error) {
    console.error(`Error loading series ${slug}:`, error)
    return null
  }
}

/**
 * 获取系列下的所有文章
 */
export function getSeriesPosts(seriesSlug: string): SeriesPost[] {
  const seriesPath = path.join(seriesDirectory, seriesSlug)
  if (!fs.existsSync(seriesPath)) {
    return []
  }

  const fileNames = fs.readdirSync(seriesPath)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'index.md')
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(seriesPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        seriesSlug,
        content,
        ...(data as SeriesPostMetadata),
      }
    })
    .sort((a, b) => {
      // 按 seriesOrder 升序排序
      return (a.seriesOrder || 999) - (b.seriesOrder || 999)
    })

  return posts
}

/**
 * 获取系列下的单篇文章
 */
export function getSeriesPostBySlug(seriesSlug: string, postSlug: string): SeriesPost | null {
  try {
    const fullPath = path.join(seriesDirectory, seriesSlug, `${postSlug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: postSlug,
      seriesSlug,
      content,
      ...(data as SeriesPostMetadata),
    }
  } catch (error) {
    console.error(`Error loading series post ${seriesSlug}/${postSlug}:`, error)
    return null
  }
}
