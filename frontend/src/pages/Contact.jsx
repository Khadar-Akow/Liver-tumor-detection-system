import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import bg from '../assets/bg-1.jpg'
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from 'react-icons/fa'

function Contact() {
  const formRef = useRef()
  const [success, setSuccess] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      'service_7fqon89',
      'template_99zrbsc',
      formRef.current,
      'RvjnSpL9rvhSsOrcH'
    ).then(
      (result) => {
        console.log(result.text)
        setSuccess(true)
        formRef.current.reset()
        setTimeout(() => setSuccess(false), 1000)

      },
      (error) => {
        console.error(error.text)
        alert('Failed to send. Please try again.')
      }
    )
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen font-['Poppins'] relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95"></div>
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 mt-25 mb-15 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-white text-center">Contact Us</h2>
            <p className="text-center mb-6 text-slate-200">
              We'd love to hear from you! Please fill out the form below.
            </p>
            {success && (
              <p className="text-green-400 text-center mb-4 font-medium">
                Message sent successfully!
              </p>
            )}
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaUser className="mr-2 text-blue-300" /> Full Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-800 text-slate-900 placeholder-slate-400"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaEnvelope className="mr-2 text-cyan-300" /> Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-800 text-slate-900 placeholder-slate-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-200 font-medium flex items-center">
                  <FaCommentDots className="mr-2 text-purple-300" /> Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-800 text-slate-900 placeholder-slate-400"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
              >
                Send Message
                <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-24 right-24 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-24 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default Contact
