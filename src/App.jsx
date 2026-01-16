import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/authSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile())
    }
  }, [dispatch, token])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App