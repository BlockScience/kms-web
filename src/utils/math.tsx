export function closestIndex<T>(
  elements: T[],
  startIndex: number,
  condition: (obj: T) => boolean,
): number | null {
  if (startIndex < 0 || startIndex >= elements.length) {
    throw new Error('Invalid start index.')
  }

  let left = startIndex - 1
  let right = startIndex + 1
  let matchIndex: number | null = null

  while (left >= 0 || right < elements.length) {
    if (right < elements.length) {
      matchIndex = condition(elements[right]) ? right : null
      if (matchIndex) return matchIndex
      right++
    }
    if (left >= 0) {
      matchIndex = condition(elements[left]) ? left : null
      if (matchIndex) return matchIndex
      left--
    }
  }
  return null
}
