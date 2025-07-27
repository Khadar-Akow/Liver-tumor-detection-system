import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import bg from '../assets/bg-1.jpg'
import { toast } from 'react-hot-toast'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password
      })

      if (res.data.success) {
        toast.success('Login successful!')
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
        navigate('/prediction/loading') // Redirect to loading screen
      } else {
        toast.error(res.data.message || 'Invalid credentials')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error during login')
    }
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen font-['Poppins'] relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white text-center flex items-center justify-center gap-2">
              <FaSignInAlt className="text-cyan-400" /> Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaEnvelope className="mr-2 text-cyan-300" /> Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-900 placeholder-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaLock className="mr-2 text-blue-300" /> Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 placeholder-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
              >
                Login
                <FaSignInAlt className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-300">
              Don’t have an account?{' '}
              <Link to="/prediction/register" className="text-cyan-400 hover:underline font-semibold">Register</Link>
            </p>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-24 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default Login
