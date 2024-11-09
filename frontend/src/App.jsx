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
import SignUp from './components/SignUp';
import NavbarTwo from './components/NavbarTwo';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import CreateCourse from './components/CreateCourse';
import NavbarThree from './components/NavbarThree';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';
import CreatedCourses from './components/CreatedCourses';
import CourseDetail from './components/CourseDetail';
import EditCourse from './components/EditCourse';
import CoursesList from './components/CoursesList';
import SearchResults from './components/SearchResults';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='w-full min-h-screen bg-zinc-900  text-white'>
          {/* <Navbar /> */}
          <Routes>
            {/* Home route */}
            <Route path="/" element={
              <>
                <Navbar />
                <LandingPage />
                <Marquee />
                <About />
                <Eyes />
                <Featured />
                <Cards />
                <Footer />
                <SignUp />

              </>
            } />
            <Route path="/home" element={
              <>
                <NavbarTwo />
                <CoursesList />
              </>
            } />

            <Route path="/dashboard" element={
              <>
                <Dashboard />

              </>
            } />

            <Route path="/edit-profile" element={
              <>
                <EditProfile />

              </>
            } />

            <Route path="/create-course" element={
              <>
                <CreateCourse />

              </>
            } />

            <Route path="/created-course" element={
              <>
                <CreatedCourses />

              </>
            } />

            <Route path="/search" element={
              <>
                <NavbarTwo />
                <SearchResults />
              </>
            } />

            <Route path="/course/:id" element={
              <>
                <CourseDetail />

              </>
            } />

            <Route path="/edit-course/:id" element={
              <>
                <EditCourse />

              </>
            } />

            <Route
              path="/instructor"
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <NavbarThree />
                </ProtectedRoute>
              }
            />

            <Route path="/about-us" element={
              <>
                <Navbar />
                <AboutUs />
              </>
            } /> {/* About Us Route */}
            <Route path="/login" element={
              <>
                <Navbar />
                <LoginForm />
              </>
            } />
            <Route path="/loginTwo" element={
              <>
                <Navbar />
                <LoginTwo />
              </>
            } /> {/* For Instructor */}
            <Route path="/footer" element={<Footer />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
