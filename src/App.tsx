import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Users } from './pages/Users'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/profile'></Route>
          <Route path='/followers' element={<Users/>}></Route>
        </Routes>
      </BrowserRouter>       
    </>
  )
}

export default App
