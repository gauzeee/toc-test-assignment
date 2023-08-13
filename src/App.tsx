import { PagesProvider } from '@/entities'
import { MainLayout, Placeholder } from '@/shared'
import { PagesNavigation } from '@/widgets'

import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <MainLayout
      asideSlot={
        <PagesProvider>
          <PagesNavigation />
        </PagesProvider>
      }
      mainSlot={<div />}
      headerSlot={<Placeholder />}
      footerSlot={<Placeholder />}
    />
  )
}

export default App
