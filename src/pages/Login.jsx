import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, getUserProfile } from '../store/authSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const resultAction = await dispatch(login({ email, password }))
      
      if (login.fulfilled.match(resultAction)) {
        await dispatch(getUserProfile())
        navigate('/profile')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <button className="sign-in-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login