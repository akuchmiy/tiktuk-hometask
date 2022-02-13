export function changeTheme(isDarkTheme: boolean) {
  if (isDarkTheme) return document.documentElement.classList.add('dark')

  document.documentElement.classList.remove('dark')
}
