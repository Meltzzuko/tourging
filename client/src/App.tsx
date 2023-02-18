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
import GenrePage from './page/Genre'
import Detailpage from './page/Detail'
import ReviewPage from './page/Review'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Indexpage />} />
        <Route path="/home" element={<Homepage />} />
          <Route path="/genre/:type" element={<GenrePage/>}/>
          <Route path="/detail/:id" element={<Detailpage/>}/>
            <Route path="/detail/:id/review" element={<ReviewPage/>}/>
            <Route path="/detail/:id/payment" element={<ProtectRoute><PaymentPage/></ProtectRoute>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userstatus" element={<ProtectRoute><UserStatusPage /></ProtectRoute>} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
