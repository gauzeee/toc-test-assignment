const PAGE_TITLE_BASE = 'Table of Contents'

export const setDocumentTitle = (newTitle?: string) => {
  const pageTitle = document.querySelector('title')
  if (pageTitle)
    pageTitle.text = `${newTitle}${!!newTitle && ' | '}${PAGE_TITLE_BASE}`
}
