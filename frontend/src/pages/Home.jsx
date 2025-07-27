import bg from '../assets/bg-1.jpg'
import { Link } from 'react-router-dom'
import { FaBrain, FaShieldAlt, FaRocket, FaChartLine, FaUserMd, FaGlobe } from 'react-icons/fa'

function Home() {
  return (
    <div
      className="bg-cover bg-center min-h-[100vh] font-['Poppins'] relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[100vh] flex flex-col justify-center items-start px-6 lg:px-12 xl:px-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-25 mb-15">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  Liver Tumor
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Detection
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Advanced AI-powered system for accurate and reliable liver tumor detection from CT scans
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Our cutting-edge platform combines state-of-the-art deep learning algorithms with medical imaging expertise to provide healthcare professionals with fast, accurate, and reliable tumor detection results. Accessible online from anywhere, anytime.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/prediction/login"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Get Started Now
                  <FaRocket className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/about"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                  <FaChartLine className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaBrain className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">AI-Powered Analysis</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Advanced deep learning algorithms trained on extensive medical datasets for unparalleled accuracy
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Secure & Reliable</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  HIPAA-compliant platform with enterprise-grade security and data protection
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaUserMd className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Medical Expertise</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Developed in collaboration with leading radiologists and medical professionals
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Global Access</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cloud-based platform accessible from anywhere with internet connection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home
