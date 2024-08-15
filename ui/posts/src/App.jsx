import './App.css'
import { Header } from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/SignUp'
import { Dashboard } from './screens/Dashboard'
function App() {


  return (
<>

<BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        </div>
      </BrowserRouter>
</>
  )
}

export default App
