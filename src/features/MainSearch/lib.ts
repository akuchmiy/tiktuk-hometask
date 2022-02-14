export function getNewLocation(query: string) {
  if (!query) return ''

  if (!query.startsWith('#')) return `/user/${query}`

  const withoutHash = encodeURIComponent(query.substring(1))
  return `/?query=${withoutHash}`
}

export function getInputAria(query: string) {
  if (!query) return 'Enter hashtag or username'

  if (!query.startsWith('#')) return 'Find user by username'

  return `Get trending news by hashtag`
}
