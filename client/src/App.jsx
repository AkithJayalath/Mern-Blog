import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from "./pages/Signup"
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import About from './pages/About'
import Header from './component/Header'
import Footer from './component/Footer'
import PrivateRoute from './component/PrivateRoute'
import OnlyAdminPrivateRoute from './component/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import UpdateAd from './pages/UpdateAd'
import PostPage from './pages/PostPage'
import ScrollToTop from './component/ScrollToTop'
import Search from './pages/Search'
import CreateAd from './pages/CreateAd'
export default function App() {
  return (
    <BrowserRouter >
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> 
        <Route element={<OnlyAdminPrivateRoute />} >
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/update-ad/:adId" element={<UpdateAd />} />
        </Route> 
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />


      </Routes>
      <Footer />
    
    </BrowserRouter>
  )
}
