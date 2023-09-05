export const highlightMatches = (
  originalTitle: string,
  matches: RegExpMatchArray[]
): string => {
  let highLighted = ''
  matches.forEach((match) => {
    const matchedString = match[0]
    highLighted +=
      originalTitle.substring(0, match.index) +
      `<span class="highlighted">${matchedString}</span>` +
      originalTitle.substring((match.index ?? 0) + matchedString.length)
  })

  return highLighted
}
