export type MediaType = 'video' | 'image' | 'youtube'

export interface MediaItem {
  id: string
  type: MediaType
  url: string
  caption?: string
  thumbnailUrl?: string
}

export interface DevlogEntry {
  id: string
  day: number
  date: string
  title: string
  summary: string
  bulletPoints?: string[]
  media?: MediaItem[]
  tags: string[]
  isPinned?: boolean
}

export interface GameProfile {
  title: string
  devName: string
  tagline: string
  engine: string
  genre: string
  startDate: string
  status: string
  links?: {
    github?: string
    youtube?: string
    twitter?: string
    discord?: string
    steam?: string
  }
}
