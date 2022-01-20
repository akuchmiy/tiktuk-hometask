export interface AuthorMeta {
  id: string
  name: string
  avatar: string
  heart: number
  video: number
  fans: number
  following: number
}

export interface Hashtag {
  id: string
  name: string
}

export interface Feed {
  id: string
  text: string
  createTime: number
  authorMeta: AuthorMeta
  videoUrl: string
  videoMeta: {
    height: number
    width: number
  }
  hashtags: Hashtag[]
  playCount: number
  diggCount: number
  commentCount: number
}
