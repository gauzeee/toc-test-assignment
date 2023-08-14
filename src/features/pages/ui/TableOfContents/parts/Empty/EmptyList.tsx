import styles from './EmptyList.module.css'
export const EmptyList = () => {
  return (
    <div className={styles.emptyList} data-testid="empty-list">
      <p>No Pages for Table of Contents provided</p>
    </div>
  )
}
