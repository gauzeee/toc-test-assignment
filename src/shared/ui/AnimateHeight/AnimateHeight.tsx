import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const AnimateHeight = ({
  children,
  isOpen,
}: {
  children: ReactNode
  isOpen: boolean
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          style={{ overflow: 'hidden' }}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
