import { PagesProvider } from '@/entities'
import { TopLevelPagesList } from '@/features'
import './App.css'
import { MainLayout } from '@/shared/ui/layout/MainLayout.tsx'
import { Placeholder } from '@/shared/ui/placeholder/Placeholder.tsx'
function App() {
  return (
    <PagesProvider>
      <MainLayout
        asideSlot={<TopLevelPagesList />}
        mainSlot={<div />}
        headerSlot={<Placeholder />}
        footerSlot={<Placeholder />}
      />
    </PagesProvider>
  )
}

export default App
