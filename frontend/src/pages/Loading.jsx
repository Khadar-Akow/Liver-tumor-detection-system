import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Loading() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/prediction/dashboard')
    }, 3000) 

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-900 to-blue-800 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-40 mb-4 mx-auto"></div>
        <p className="text-xl font-semibold">Loading your dashboard...</p>
      </div>
    </div>
  )
}

export default Loading
