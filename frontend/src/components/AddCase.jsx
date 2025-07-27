import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FaUser, FaCalendar, FaVenusMars, FaEnvelope, FaPhone, FaImage, FaUpload, FaSpinner } from 'react-icons/fa'

function AddCase() {
  const [caseData, setCaseData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    number: '',
    image: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCaseData({ ...caseData, [name]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      setCaseData({ ...caseData, image: file })
    } else {
      toast.error('Only JPG, JPEG or PNG images are allowed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const { name, age, gender, email, number, image } = caseData

    if (!name || !age || !gender || !email || !number || !image) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('age', age)
      formData.append('gender', gender)
      formData.append('email', email)
      formData.append('number', number)
      formData.append('image', image)

      const response = await axios.post(
        'http://localhost:5000/prediction/cases/add',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (response.data.success) {
        toast.success(`Prediction Result: ${response.data.result}`)
        navigate('/prediction/cases/view')
      } else {
        toast.error(response.data.message || 'Submission failed')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error submitting case')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-3 rounded-xl shadow-lg">
              <FaUpload className="text-white text-xl" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Add New Case</h1>
              <p className="text-slate-600 text-sm">Upload patient information for tumor detection analysis</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <FaUser className="inline mr-2 text-blue-600" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter patient's full name"
                    value={caseData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <FaCalendar className="inline mr-2 text-blue-600" />
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    placeholder="Enter age"
                    value={caseData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <FaVenusMars className="inline mr-2 text-blue-600" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={caseData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-slate-50 focus:bg-white"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <FaPhone className="inline mr-2 text-blue-600" />
                    Phone Number
                  </label>
                  <input
                    name="number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={caseData.number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <FaEnvelope className="inline mr-2 text-blue-600" />
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={caseData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                Medical Image
              </h3>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <FaImage className="inline mr-2 text-blue-600" />
                  Upload Liver Scan Image
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <FaUpload className="mx-auto text-3xl text-slate-400" />
                    <p className="text-slate-600">
                      {caseData.image ? caseData.image.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-slate-500">JPG, JPEG, PNG files only</p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {caseData.image && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Image Preview</h4>
                  <div className="flex justify-center">
                    <img
                      src={URL.createObjectURL(caseData.image)}
                      alt="Preview"
                      className="w-48 h-48 rounded-xl object-cover shadow-lg border border-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaUpload />
                    <span>Submit Case for Analysis</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCase
