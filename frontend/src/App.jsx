import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './assets/css/style.scss'
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import BlogsPage from './components/BlogsPage';
import ContactUs from './components/ContactUs';
import Login from './components/backend/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/common/RequireAuth';
import {default as ShowServices} from './components/backend/services/show';
import {default as CreateService} from './components/backend/services/Create';
import {default as EditService} from './components/backend/services/Edit';
import ShowProjects from './components/backend/projects/ShowProjects';
import CreateProjects from './components/backend/projects/CreateProjects';
import EditProjects from './components/backend/projects/EditProjects';
import ShowArticles from './components/backend/articles/ShowArticles';
import CreateArticles from './components/backend/articles/CreateArticles';
import EditArticles from './components/backend/articles/EditArticles';
import ShowTestimonials from './components/backend/testimonials/ShowTestimonials';
import CreateTestimonials from './components/backend/testimonials/CreateTestimonials';
import EditTestimonials from './components/backend/testimonials/EditTestimonials';
import ShowMembers from './components/backend/members/ShowMembers';
import CreateMembers from './components/backend/members/CreateMembers';
import EditMembers from './components/backend/members/EditMembers';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/blogs' element={<BlogsPage/>}/>
          <Route path='/contact-us' element={<ContactUs/>}/>
          <Route path='/admin/login' element={<Login/>}/>

          <Route path='/admin/dashboard' element={
            <RequireAuth>
              <Dashboard/>
            </RequireAuth>
            }/>

          <Route path='/admin/services' element={
            <RequireAuth>
              <ShowServices/>
            </RequireAuth>
            }/>

          <Route path='/admin/services/create' element={
            <RequireAuth>
              <CreateService/>
            </RequireAuth>
            }/>
            
            <Route path='/admin/services/edit/:id' element={
            <RequireAuth>
              <EditService/>
            </RequireAuth>
            }/>

            <Route path='/admin/projects' element={
            <RequireAuth>
              <ShowProjects/>
            </RequireAuth>
            }/>

            <Route path='/admin/projects/create' element={
            <RequireAuth>
              <CreateProjects/>
            </RequireAuth>
            }/>

            <Route path='/admin/projects/edit/:id' element={
            <RequireAuth>
              <EditProjects/>
            </RequireAuth>
            }/>

            <Route path='/admin/articles' element={
            <RequireAuth>
              <ShowArticles/>
            </RequireAuth>
            }/>

            <Route path='/admin/articles/create' element={
            <RequireAuth>
              <CreateArticles/>
            </RequireAuth>
            }/>

            <Route path='/admin/articles/edit/:id' element={
            <RequireAuth>
              <EditArticles/>
            </RequireAuth>
            }/>

            <Route path='/admin/testimonials/create' element={
            <RequireAuth>
              <CreateTestimonials/>
            </RequireAuth>
            }/>

            <Route path='/admin/testimonials/edit/:id' element={
            <RequireAuth>
              <EditTestimonials/>
            </RequireAuth>
            }/>

            <Route path='/admin/testimonials' element={
            <RequireAuth>
              <ShowTestimonials/>
            </RequireAuth>
            }/>

            <Route path='/admin/members' element={
            <RequireAuth>
              <ShowMembers/>
            </RequireAuth>
            }/>
            
            <Route path='/admin/members/create' element={
            <RequireAuth>
              <CreateMembers/>
            </RequireAuth>
            }/>

            <Route path='/admin/members/edit/:id' element={
            <RequireAuth>
              <EditMembers/>
            </RequireAuth>
            }/>

        </Routes>
      </BrowserRouter>
      <ToastContainer 
      position='top-center'
      />
    </>
  )
}



export default App
