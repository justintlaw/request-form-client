import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ResponsiveDrawer from './components/Navigation/ResponsiveDrawer'
import Home from './pages/Home'
import Submit from './pages/Submit'
import Requests from './pages/Requests'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveDrawer title="Maintenance Requests" />}>
            <Route index element={<Home />} />
            <Route path="submit" element={<Submit />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
