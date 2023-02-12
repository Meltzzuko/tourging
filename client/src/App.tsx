import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Homepage from './page/Home'
import Indexpage from './page/Index'
import LoginPage from './page/Login'
import RegisterPage from './page/Register'
import UserStatusPage from './page/UserStatus'
import LogoutPage from './page/Logout'
import PaymentPage from './page/Payment'
import { ProtectRoute } from './helper'
import OneDayTripPage from './page/OneDayTrip'
import ManyDayTripPage from './page/ManyDayTrip'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Indexpage />} />
        <Route path="/home" element={<Homepage />} />
          <Route path="/onedaytrip" element={<OneDayTripPage/>}/>
          <Route path="/manydaytrip" element={<ManyDayTripPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userstatus" element={<UserStatusPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/payment" element={<ProtectRoute><PaymentPage/></ProtectRoute>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
