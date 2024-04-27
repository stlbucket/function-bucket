const useScreenWidth = (): number | undefined => {
  if (window) {
    const width = window.screen.width
    return width
  }
  return
}

// const useScreenWidth = (): string => {
//   if (window) {
//     if (process.client) {
//       const width = window.screen.width
//       return `${width}px`
//     }
//     else {
//       return '100%'
//     }
//   }
//   return '100%'
// }

export { useScreenWidth }