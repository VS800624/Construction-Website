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

        </Routes>
      </BrowserRouter>
      <ToastContainer 
      position='top-center'
      />
    </>
  )
}



export default App
