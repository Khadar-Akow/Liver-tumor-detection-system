import bg from '../assets/bg-1.jpg'
import { Link } from 'react-router-dom'
import { FaUsers, FaBrain, FaGraduationCap, FaHeartbeat, FaArrowRight } from 'react-icons/fa'

function About() {
  return (
    <div
      className="bg-cover bg-center min-h-screen font-['Poppins'] relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-12">
        <div className="max-w-3xl w-full mx-auto">
          {/* About Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col items-start mt-15 mb-10 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-4">
              <FaGraduationCap className="mr-2 text-cyan-300" />
              Final Year Project
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <p className="text-lg text-slate-200 mb-6 flex items-start">
              We are a team of final-year students developing a liver tumor detection system as part of our graduation project. Our work focuses on applying deep learning techniques—specifically the DenseNet model—to analyze CT scan images and detect liver tumors accurately.
            </p>
            <p className="text-lg text-slate-200 mb-6 flex items-start">
              This project combines our passion for artificial intelligence with a real-world healthcare application. While we are not medical experts, we aim to contribute to the field by building a tool that supports early diagnosis and treatment planning.
            </p>
            <p className="text-lg text-slate-200 mb-8 flex items-start">
              Our system is still under academic development, but it represents our commitment to learning, innovation, and using technology for social good.
            </p>
            <Link to="/contact" className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center">
              Contact Us
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Team Section (optional, can be removed if not needed) */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Our Mission</h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              To bridge the gap between technology and healthcare by leveraging AI for early, accessible, and accurate medical diagnostics.
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

export default About