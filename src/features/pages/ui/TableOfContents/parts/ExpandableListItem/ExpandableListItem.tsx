import { ListItem } from '@/entities'
import { useListItemState } from '@/features/pages/lib'
import { AnimateHeight, useScrollToElementOnInitialRender } from '@/shared'

import { NestedList } from '../NestedList/NestedList'
export const ExpandableListItem = ({ pageId }: { pageId: string }) => {
  const {
    page,
    showBacklight,
    isActive,
    hasInnerList,
    handleClick,
    handleKeyUp,
    isOpen,
  } = useListItemState(pageId)

  useScrollToElementOnInitialRender(isActive, `${pageId}-list-item`)

  return (
    <>
      <ListItem
        handleClick={handleClick}
        handleKeyUp={handleKeyUp}
        hasInnerList={hasInnerList}
        level={page.level}
        isActive={isActive}
        showBacklight={showBacklight}
        isOpen={isOpen}
        id={`${pageId}-list-item`}
        testId={`${pageId}-list-item`}
      >
        <span dangerouslySetInnerHTML={{ __html: page.title }} />
      </ListItem>
      {hasInnerList && (
        <AnimateHeight isOpen={isOpen}>
          <NestedList
            pagesIds={page.pages}
            isActive={showBacklight}
            testId={`${pageId}-nested-list`}
          />
        </AnimateHeight>
      )}
    </>
  )
}
