import { apiClient } from 'shared/api/base'
import { UserData } from './models'
import { HOST_URL } from 'shared/config'
import { readFileFromWWW } from 'shared/lib'

export async function getUserInfo(username: string): Promise<UserData> {
  const finalUrl = `${HOST_URL}/userInfo.json`
  try {
    const { data } = await getPlatformIndependentUserInfo(
      'userInfo.json',
      finalUrl
    )
    checkUser(data)

    return data
  } catch (error: any) {
    if (error instanceof Error) throw error
    else throw new Error('Unexpected error')
  }
}

async function getPlatformIndependentUserInfo(
  filename: string,
  url: string
): Promise<{ data: UserData }> {
  if (!window.cordova) return apiClient.get<UserData>(url)

  const result = await readFileFromWWW(filename)

  return {
    data: JSON.parse(result),
  }
}

function checkUser(userData: UserData) {
  if (!userData.user) throw new Error('Absent user')
}
