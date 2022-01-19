export interface UserData {
  user: User
  stats: UserStats
}

export interface UserStats {
  followerCount: number
  followingCount: number
  heart: number
  videoCount: number
  diggCount: number
}

export interface User {
  id: string
  uniqueId: string
  nickname: string
  avatarMedium: string
  avatarThumb: string
  signature: string
  bioLink: {
    link: string
    risk: number
  }
  verified: boolean
}
