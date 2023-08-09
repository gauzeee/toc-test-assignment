import { PagesProvider } from '@/entities'
import { TopLevelPagesList } from '@/features'
import './App.css'
function App() {
  return (
    <PagesProvider>
      <div>
        <TopLevelPagesList />
      </div>
    </PagesProvider>
  )
}

export default App
