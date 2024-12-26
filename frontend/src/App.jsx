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
import CourseDetails from './components/CourseDetails';
import CartPage from './components/CartPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import MyCourses from './components/MyCourses';
import MyCourseDetail from './components/MyCourseDetail';
import MyChat from './components/MyChat';
import AllChats from './components/AllChats';
import UnreadMessages from './components/UnreadMessages';
import AddReview from './components/AddReview';
import AddLecture from './components/AddLecture';



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

            <Route path="/my-courses" element={
              <>
                <NavbarTwo />
                <MyCourses />
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

            <Route path="/success" element={
              <>
                <SuccessPage />

              </>
            } />

            <Route path="/cancel" element={
              <>
                <CancelPage />

              </>
            } />

            <Route path="/create-course" element={
              <>
                <CreateCourse />

              </>
            } />
            <Route path="/cart" element={
              <>
                <CartPage />

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

            <Route path="/courses/:courseId" element={<CourseDetails />} />

            <Route path="/mycourse/:courseId" element={<MyCourseDetail />} />

            <Route path="mychat/:courseId/:userId" element={<MyChat />} />

            <Route path="/unread-messages/:courseId" element={<UnreadMessages />} />
            <Route path="/all-chats/:courseId" element={<AllChats />} />

            {/* <Route path="mychat/:courseId/:studentId" element={<MyIChat />} /> */}

            <Route path="/addreview/:courseId" element={<AddReview />} />

            <Route path="/add-lecture/:courseId" element={<AddLecture />} />


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
