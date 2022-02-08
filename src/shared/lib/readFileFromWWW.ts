export function readFileFromWWW(filename: string) {
  return new Promise<string>((resolve, reject) => {
    getWWWFileEntry(filename, (fileEntry) => {
      ;(fileEntry as FileEntry).file(
        (file) => {
          const reader = new FileReader()

          reader.onloadend = () => {
            resolve(reader.result as string)
          }

          reader.readAsText(file)
        },
        () => {
          reject(new Error('read went wrong'))
        }
      )
    })
  })
}

function getWWWFileEntry(
  filename: string,
  callback: (fileEntry: Entry) => void
) {
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}www/${filename}`,
    callback
  )
}
