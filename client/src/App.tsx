import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Homepage from './page/Home'
import Indexpage from './page/Index'
import LoginPage from './page/Login'
import RegisterPage from './page/Register'
import UserStatusPage from './page/UserStatus'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Indexpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userstatus" element={<UserStatusPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
