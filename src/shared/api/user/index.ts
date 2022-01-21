import { apiClient } from 'shared/api/base'
import { UserData } from './models'

export async function getUserInfo(username: string): Promise<UserData> {
  try {
    const { data } = await apiClient.get<UserData>(`user/info/${username}`)
    checkUser(data)

    return data
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error('Unexpected error')
  }
}

function checkUser(userData: UserData) {
  if (!userData.user) throw new Error('Absent user')
}
