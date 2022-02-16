import { apiClient } from 'shared/api/base'
import { UserData } from './models'
import { isDevEnv } from 'shared/config'

export async function getUserInfo(username: string): Promise<UserData> {
  const finalUrl = isDevEnv
    ? 'http://localhost:3000/userInfo.json'
    : `user/info/${username}`
  try {
    const { data } = await apiClient.get<UserData>(finalUrl)
    checkUser(data)

    return data
  } catch (error: any) {
    if (error instanceof Error) throw error
    else throw new Error('Unexpected error')
  }
}

function checkUser(userData: UserData) {
  if (!userData.user) throw new Error('Absent user')
}
