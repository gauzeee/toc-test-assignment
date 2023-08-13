import { MainLayout, Placeholder } from '@/shared'
import { PagesNavigation } from '@/widgets'

import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <MainLayout
      asideSlot={<PagesNavigation />}
      mainSlot={<div />}
      headerSlot={<Placeholder />}
      footerSlot={<Placeholder />}
    />
  )
}

export default App
