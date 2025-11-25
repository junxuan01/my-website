export interface SeriesMetadata {
  title: string
  description: string
  date: string
  image?: string
  status?: 'updating' | 'completed'
}

export interface Series extends SeriesMetadata {
  slug: string
  content: string // index.md 的内容
}

export interface SeriesPostMetadata {
  title: string
  date: string
  description: string
  seriesOrder: number
}

export interface SeriesPost extends SeriesPostMetadata {
  slug: string
  content: string
  seriesSlug: string
}
