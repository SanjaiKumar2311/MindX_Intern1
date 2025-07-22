// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
// import AccountVerification from './pages/AccountVerification'
// import LoginPage from './pages/Login'
// import RegisterPage from './pages/Register'
import AppRouter from './router/routes'
import { Toaster } from './components/ui/sonner'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>      
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
          <Toaster />
        </BrowserRouter>        
      </AuthProvider>
    </>
    
  )
}

export default App
