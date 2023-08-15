export const delay = (waitForMs: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, waitForMs)
  })
}
