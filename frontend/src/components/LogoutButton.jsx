import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

function LogoutButton({ setIsLoggedIn, isCollapsed = false }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    toast((t) => (
      <div className="p-4">
        <p className="text-sm text-gray-800 mb-2">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 bg-cyan-600 rounded py-1 text-sm text-white hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('isLoggedIn')
              setIsLoggedIn(false)
              toast.dismiss(t.id)
              toast.success('Logged out successfully!')
              navigate('/prediction/login')
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
      },
    })
  }

  return (
    <button
      onClick={handleLogout}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl ${
        isCollapsed ? 'justify-center' : ''
      }`}
      title={isCollapsed ? 'Logout' : ''}
    >
      <div className={`${isCollapsed ? 'text-xl' : 'mr-3'} transition-all duration-200 group-hover:scale-110`}>
        <FaSignOutAlt />
      </div>
      {!isCollapsed && <span className="font-medium">Logout</span>}
    </button>
  )
}

export default LogoutButton
