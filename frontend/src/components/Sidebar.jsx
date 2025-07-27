import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaPlus,
  FaEye,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHospital
} from 'react-icons/fa'
import LogoutButton from './LogoutButton'

function Sidebar({ setIsLoggedIn, onCollapseChange }) {
  const location = useLocation()
  const [showCasesSubmenu, setShowCasesSubmenu] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (path) => location.pathname === path

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed)
    }
  }, [isCollapsed, onCollapseChange])

  return (
    <div className={`bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 text-white min-h-screen px-4 py-6 fixed transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-700/50 ${isCollapsed ? 'w-20' : 'w-72'
      }`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 border-2 border-white/20"
      >
        {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
      </button>

      {/* Logo/Title Section */}
      <div className={`mb-12 ${isCollapsed ? 'text-center' : ''}`}>
        {isCollapsed ? (
          <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-3 rounded-xl shadow-lg">
            <FaHospital className="text-2xl text-white mx-auto" />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl font-bold text-white">TechFrontier</h1>
              <p className="text-xs text-blue-300">Medical AI</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-3">
        {/* Dashboard Link */}
        <div className="relative">
          <Link
            to="/prediction/dashboard"
            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/prediction/dashboard')
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
              : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Dashboard' : ''}
          >
            <div className={`${isCollapsed ? 'text-xl' : 'mr-3'} transition-all duration-200 group-hover:scale-110`}>
              <FaTachometerAlt />
            </div>
            {!isCollapsed && (
              <span className="font-medium">Dashboard</span>
            )}
            {isActive('/prediction/dashboard') && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
            )}
          </Link>
        </div>

        {/* Cases Section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowCasesSubmenu(!showCasesSubmenu)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${(isActive('/prediction/cases/view') || isActive('/prediction/cases/add'))
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
              } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            title={isCollapsed ? 'Cases' : ''}
          >
            <span className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
              <div className={`${isCollapsed ? 'text-xl' : 'mr-3'} transition-all duration-200 group-hover:scale-110`}>
                <FaFolderOpen />
              </div>
              {!isCollapsed && <span className="font-medium">Cases</span>}
            </span>
            {!isCollapsed && (
              <div className={`transition-transform duration-200 ${showCasesSubmenu ? 'rotate-180' : ''}`}>
                <FaChevronRight size={12} />
              </div>
            )}
            {(isActive('/prediction/cases/view') || isActive('/prediction/cases/add')) && !isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>

          {/* Submenu */}
          {showCasesSubmenu && !isCollapsed && (
            <div className="ml-4 space-y-1">
              <Link
                to="/prediction/cases/view"
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 group ${isActive('/prediction/cases/view')
                  ? 'bg-green-600/20 text-green-300 border-l-2 border-green-500'
                  : 'text-gray-400 hover:bg-slate-700/30 hover:text-gray-200'
                  }`}
              >
                <FaEye className="mr-3 text-sm group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">View Cases</span>
              </Link>
              <Link
                to="/prediction/cases/add"
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 group ${isActive('/prediction/cases/add')
                  ? 'bg-green-600/20 text-green-300 border-l-2 border-green-500'
                  : 'text-gray-400 hover:bg-slate-700/30 hover:text-gray-200'
                  }`}
              >
                <FaPlus className="mr-3 text-sm group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">Add Case</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Section */}
      <div className={`mt-auto pt-8 ${isCollapsed ? 'text-center' : ''}`}>
        <LogoutButton setIsLoggedIn={setIsLoggedIn} isCollapsed={isCollapsed} />
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}

export default Sidebar
