import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FaSpinner, FaSearch, FaFilter, FaTrash, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaVenusMars } from 'react-icons/fa'

function ViewCase() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:5000/prediction/cases/view')
      .then((response) => {
        if (response.data.success) {
          setCases(response.data.cases)
        } else {
          toast.error(response.data.message || "No cases found")
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch cases")
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleDelete = (caseId) => {
    toast((t) => (
      <span>
        Are you sure you want to delete this case?
        <div className="mt-2 flex gap-2 justify-end">
          <button
            className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded transition-colors"
            onClick={() => {
              axios
                .delete(`http://localhost:5000/prediction/cases/delete/${caseId}`)
                .then((response) => {
                  if (response.data.success) {
                    const updated = cases.filter(c => c.Cases_id !== caseId)
                    setCases(updated)
                    toast.success('Case deleted successfully', { id: t.id })
                  } else {
                    toast.error(response.data.message || 'Failed to delete case')
                  }
                })
                .catch((error) => {
                  toast.error('Failed to delete case')
                  console.error(error)
                })
            }}
          >
            Yes, delete
          </button>
          <button
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ), { duration: 3000 })
  }

  const filteredCases = cases.filter((c) => {
    const matchSearch =
      (c.FullName?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (c.Email?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (c.Cases_id?.toString() || '').includes(search) ||
      (String(c.Phone || '')).includes(search)
    const matchFilter = filter === 'All' || c.Result === filter
    return matchSearch && matchFilter
  })

  const getStats = () => {
    const total = cases.length
    const tumor = cases.filter(c => c.Result === 'Tumor').length
    const noTumor = cases.filter(c => c.Result === 'No Tumor').length
    return { total, tumor, noTumor }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Case Records</h1>
              <p className="text-slate-600 mt-1">Manage and view all patient cases</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
              title={isExpanded ? 'Hide Details' : 'Show Details'}
            >
              {isExpanded ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
            </button>
          </div>

          {/* Collapsible Content */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Total Cases</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                    <FaIdCard className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">Tumor Cases</p>
                    <p className="text-2xl font-bold text-red-600">{stats.tumor}</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
                    <FaUser className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-900">No Tumor Cases</p>
                    <p className="text-2xl font-bold text-green-600">{stats.noTumor}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                    <FaUser className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select
                  className="pl-10 pr-8 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white appearance-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Cases</option>
                  <option value="Tumor">Tumor Cases</option>
                  <option value="No Tumor">No Tumor Cases</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-50'
          }`}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading cases...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaIdCard className="mr-2" />
                        Case ID
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaUser className="mr-2" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Age
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaVenusMars className="mr-2" />
                        Gender
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FaPhone className="mr-2" />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredCases.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="text-slate-500">
                          <FaEye className="mx-auto text-4xl mb-4 opacity-50" />
                          <p className="text-lg font-medium">No cases found</p>
                          <p className="text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCases.map((c, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          #{c.Cases_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {c.FullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {c.Age} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {c.Gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {c.Email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {c.Phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${c.Result === 'Tumor'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                            }`}>
                            {c.Result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete(c.Cases_id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-1"
                          >
                            <FaTrash className="text-xs" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCase
