import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  // Hide navbar on protected routes (dashboard/cases/etc.)
  const hideNavbar = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/cases')

  if (hideNavbar) return null

  return (
    <nav className="fixed top-3 left-3 right-3 z-50 bg-white/10 backdrop-blur-md text-gray-200 shadow-lg px-4 rounded-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link to="/">TechFrontier</Link>
        </div>
        <div className="space-x-5 text-l md:text-base">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/prediction/login" className="hover:text-yellow-400">Prediction</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
