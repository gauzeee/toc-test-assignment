import { ListItemSkeleton } from '@/entities'

const baseArray = Array(20).fill(1)
export const Loader = () => {
  return (
    <>
      {baseArray.map((val, idx) => (
        <ListItemSkeleton key={val + idx} />
      ))}
    </>
  )
}
