import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {lazy, Suspense} from "react";
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/style.scss'
// import Home from './components/home/Home';
// import About from './components/About';
// import Services from './components/Services';
// import Projects from './components/Projects';
// import BlogsPage from './components/BlogsPage';
// import ContactUs from './components/ContactUs';
// import Login from './components/backend/Login';
// import Dashboard from './components/backend/Dashboard';
// import RequireAuth from './components/common/RequireAuth';
// import {default as ShowServices} from './components/backend/services/show';
// import {default as CreateService} from './components/backend/services/Create';
// import {default as EditService} from './components/backend/services/Edit';
// import ShowProjects from './components/backend/projects/ShowProjects';
// import CreateProjects from './components/backend/projects/CreateProjects';
// import EditProjects from './components/backend/projects/EditProjects';
// import ShowArticles from './components/backend/articles/ShowArticles';
// import CreateArticles from './components/backend/articles/CreateArticles';
// import EditArticles from './components/backend/articles/EditArticles';
// import ShowTestimonials from './components/backend/testimonials/ShowTestimonials';
// import CreateTestimonials from './components/backend/testimonials/CreateTestimonials';
// import EditTestimonials from './components/backend/testimonials/EditTestimonials';
// import ShowMembers from './components/backend/members/ShowMembers';
// import CreateMembers from './components/backend/members/CreateMembers';
// import EditMembers from './components/backend/members/EditMembers';
// import ServiceDetail from './components/ServiceDetail';
// import ProjectDetail from './components/ProjectDetail';
// import BlogDetail from './components/BlogDetail';

// Projects
const ShowProjects = lazy(() => import("./components/backend/projects/ShowProjects"));
const CreateProjects = lazy(() => import("./components/backend/projects/CreateProjects"));
const EditProjects = lazy(() => import("./components/backend/projects/EditProjects"));

// Articles
const ShowArticles = lazy(() => import("./components/backend/articles/ShowArticles"));
const CreateArticles = lazy(() => import("./components/backend/articles/CreateArticles"));
const EditArticles = lazy(() => import("./components/backend/articles/EditArticles"));

// Testimonials
const ShowTestimonials = lazy(() => import("./components/backend/testimonials/ShowTestimonials"));
const CreateTestimonials = lazy(() => import("./components/backend/testimonials/CreateTestimonials"));
const EditTestimonials = lazy(() => import("./components/backend/testimonials/EditTestimonials"));

// Members
const ShowMembers = lazy(() => import("./components/backend/members/ShowMembers"));
const CreateMembers = lazy(() => import("./components/backend/members/CreateMembers"));
const EditMembers = lazy(() => import("./components/backend/members/EditMembers"));

// Services
const ShowServices = lazy(() => import("./components/backend/services/show"));
const CreateService = lazy(() => import("./components/backend/services/Create"));
const EditService = lazy(() => import("./components/backend/services/Edit"));

// Frontend
const ServiceDetail = lazy(() => import("./components/ServiceDetail"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Projects = lazy(() => import("./components/Projects"));
const BlogsPage = lazy(() => import("./components/BlogsPage"));
const ContactUs = lazy(() => import("./components/ContactUs"));

// Auth + Admin
const Login = lazy(() => import("./components/backend/Login"));
const Dashboard = lazy(() => import("./components/backend/Dashboard"));



function App() {


  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Frontend */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

              {/* Admin */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
            {/* Services */}
            <Route path="/admin/services" element={<RequireAuth><ShowServices/></RequireAuth>} />
            <Route path="/admin/services/create" element={<RequireAuth><CreateService/></RequireAuth>} />
            <Route path="/admin/services/edit/:id" element={<RequireAuth><EditService/></RequireAuth>} />

            {/* Projects */}
            <Route path="/admin/projects" element={<RequireAuth><ShowProjects/></RequireAuth>} />
            <Route path="/admin/projects/create" element={<RequireAuth><CreateProjects/></RequireAuth>} />
            <Route path="/admin/projects/edit/:id" element={<RequireAuth><EditProjects/></RequireAuth>} />

            {/* Articles */}
            <Route path="/admin/articles" element={<RequireAuth><ShowArticles/></RequireAuth>} />
            <Route path="/admin/articles/create" element={<RequireAuth><CreateArticles/></RequireAuth>} />
            <Route path="/admin/articles/edit/:id" element={<RequireAuth><EditArticles/></RequireAuth>} />

            {/* Testimonials */}
            <Route path="/admin/testimonials" element={<RequireAuth><ShowTestimonials/></RequireAuth>} />
            <Route path="/admin/testimonials/create" element={<RequireAuth><CreateTestimonials/></RequireAuth>} />
            <Route path="/admin/testimonials/edit/:id" element={<RequireAuth><EditTestimonials/></RequireAuth>} />

            {/* Members */}
            <Route path="/admin/members" element={<RequireAuth><ShowMembers/></RequireAuth>} />
            <Route path="/admin/members/create" element={<RequireAuth><CreateMembers/></RequireAuth>} />
            <Route path="/admin/members/edit/:id" element={<RequireAuth><EditMembers/></RequireAuth>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer 
      position='top-center'
      />
    </>
  )
}



export default App
