import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Homepage from './page/Home'
import Indexpage from './page/Index'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Indexpage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
