import { ChangeEvent, FormEvent, useState } from 'react'

import { Input, SearchIcon, useSearchParams } from '@/shared'

import styles from './SearchFilter.module.css'

export const SearchFilter = ({ disabled }: { disabled?: boolean }) => {
  const { searchParams, setSearchParams } = useSearchParams()
  const [searchValue, setSearchInputValue] = useState(
    searchParams.get('q') ?? ''
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const data = new FormData(e.currentTarget)
    setSearchParams({ q: data.get('q') as string })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value)
    if (!('inputType' in e.nativeEvent)) {
      setSearchParams({ q: undefined })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      aria-disabled={disabled}
      data-testid="search-form"
    >
      <Input
        disabled={disabled}
        classes={{ container: styles.searchContainer }}
        type="search"
        iconBefore={<SearchIcon />}
        value={searchValue}
        onChange={handleChange}
        id="q"
        name="q"
        testId="search-input"
        aria-label="Search for pages..."
      />
    </form>
  )
}
