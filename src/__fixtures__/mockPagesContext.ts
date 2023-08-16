import { EnhancedPages } from '@/features/pages/lib'

export const mockPagesContext: EnhancedPages = {
  mockPageId: {
    pages: ['mockNestedPageId'],
    parentId: 'ij',
    level: 0,
    title: 'Mock Page Title',
    url: '',
    allNestedPagesIds: ['mockNestedPageId'],
    id: 'mockPageId',
    tabIndex: 0,
    doNotShowWarningLink: true,
  },
  mockNestedPageId: {
    pages: [],
    parentId: 'mockPageId',
    level: 1,
    title: 'Mock Nested Page Title',
    url: '',
    allNestedPagesIds: [],
    id: 'mockNestedPageId',
    tabIndex: 0,
    doNotShowWarningLink: true,
  },
}
