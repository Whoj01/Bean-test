import { Outlet } from 'react-router-dom'
import { Header } from './components/ui/Header'

function App() {
  return (
    <main className='flex flex-col items-center max-w-screen min-h-screen bg-mainbg px-3'>
      <Header />

      <Outlet />
    </main>
  )
}

export default App
