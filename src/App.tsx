import { PagesProvider } from '@/entities'
import { TopLevelList } from '@/features'
import { MainLayout, Placeholder } from '@/shared'

import './App.css'
function App() {
  return (
    <MainLayout
      asideSlot={
        <PagesProvider>
          <TopLevelList />
        </PagesProvider>
      }
      mainSlot={<div />}
      headerSlot={<Placeholder />}
      footerSlot={<Placeholder />}
    />
  )
}

export default App
