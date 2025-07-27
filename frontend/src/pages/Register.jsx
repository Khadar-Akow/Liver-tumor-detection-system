import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import bg from '../assets/bg-1.jpg'
import { toast } from 'react-hot-toast'
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'

function Register({ setIsLoggedIn }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    // ✅ Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/register', {
        fullName: name,
        email,
        password
      })

      if (res.data.success) {
        toast.success('Registered successfully! Please login')
        setIsLoggedIn(false) // Just for safety
        navigate('/prediction/login')
      } else {
        toast.error(res.data.message || 'Registration failed')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error')
    }
  }

  return (
    <div className="bg-cover bg-center min-h-screen font-['Poppins'] relative overflow-hidden" style={{ backgroundImage: `url(${bg})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 mt-25 mb-15 relative z-10">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl px-10 py-6 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white text-center flex items-center justify-center gap-2">
              <FaUserPlus className="text-cyan-400" /> Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaUser className="mr-2 text-blue-300" /> Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-900 placeholder-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>
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
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaLock className="mr-2 text-cyan-300" /> Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-900 placeholder-slate-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
              >
                Register
                <FaUserPlus className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link to="/prediction/login" className="text-cyan-400 hover:underline font-semibold">Login</Link>
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

export default Register
