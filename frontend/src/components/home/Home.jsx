import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './HeroSection';
import Header from './Header';
import Footer from './Footer';
import ConstructionImg from '../../assets/images/construction2.jpg'
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Blogs from './Blogs';
import AboutSection from './AboutSection';
import { apiUrl } from '../common/http';
import { useEffect, useState } from 'react';
import LatestServices from '../common/LatestServices';

const Home = () => {

    
    return (
        <>
           <Header/>
       <main>
        {/* hero section */}
           <HeroSection/>
           {/* About us section */}
          <AboutSection/>

        {/* Our Services */}
        <LatestServices/>

        {/*Why Choose Us  */}
            <WhyChooseUs/>

        {/* Our Projects */}
          <section className='section-3 bg-light py-5'>
            <div className="container-fluid py-5">
                <div className='section-header text-center'>
                    <span>Our Projects</span>
                    <h2>Discover our diverse range of projects</h2>
                    <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                </div>
                <div className="row pt-4">
                    <div className="col-md-3 col-lg-3">
                        <div className='item'>
                            <div className='service-image'>
                                <img src={ConstructionImg} alt="" className='w-100'/>
                            </div>
                            <div className='service-body'>
                                <div className="service-title">
                                    <h3>Kolkata Construction</h3>
                                    <div className='service-content'>
                                        <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                                    </div>
                                    <a href="#" className='btn btn-primary small'>Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main> 
        
        <Testimonials/>
        <Blogs/>
        <Footer/>
        
        </>
    )
}

export default Home;