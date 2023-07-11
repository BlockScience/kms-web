import { Box, Skeleton, Stack } from '@mantine/core'

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function Paragraphs(lines: number[]) {
  const width = (lineLength: number, i: number) => {
    return i + 1 === lineLength ? `${randomRange(30, 90)}%` : '100%'
  }
  return lines.map((length, i) => (
    <Box key={`paragraph-${i}`} mb={20}>
      {[...Array(length)].map((e, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          height={14}
          mb={5}
          radius='xl'
          width={width(length, i)}
        />
      ))}
    </Box>
  ))
}

export function CardsSkeleton(cards: number[]) {
  return cards.map((height, i) => (
    <Skeleton key={`skele-${i}`} height={height} radius='md' />
  ))
}
