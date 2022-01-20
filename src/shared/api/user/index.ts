import { UserData } from 'domain/UserData'
import { apiClient } from 'shared/api'

export async function getUserInfo(username: string): Promise<UserData | null> {
  try {
    const { data } = await apiClient.get<UserData>(`user/info/${username}`)
    if (!data?.user) return null

    return data
  } catch (e) {
    return null
  }
}
