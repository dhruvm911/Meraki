import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/eyes'
import Featured from './components/Featured'
import Cards from './components/Cards'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import LoginTwo from './components/LoginTwo';
import AboutUs from './components/AboutUs';
import SignUp from './components/Signup';

function App() {
  return (
    <Router>
    <div className='w-full min-h-screen bg-zinc-900  text-white'>
      <Navbar />
      <Routes>
          {/* Home route */}
          <Route path="/" element={
            <>
      <LandingPage />
      <Marquee/>
      <About/>
      <Eyes/>
      <Featured/>
      <Cards/>
      <Footer/>
      <SignUp/>
  
      </>
          } />

<Route path="/about-us" element={<AboutUs />} /> {/* About Us Route */}
<Route path="/login" element={<LoginForm />} />
<Route path="/loginTwo" element={<LoginTwo />} /> {/* For Instructor */}
<Route path="/footer" element={<Footer />} />
<Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
