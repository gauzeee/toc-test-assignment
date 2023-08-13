import { ListItemSkeleton } from '@/entities'

export const Loader = () => {
  return (
    <>
      {Array(20)
        .fill(1)
        .map((val, idx) => (
          <ListItemSkeleton key={val + idx} />
        ))}
    </>
  )
}
