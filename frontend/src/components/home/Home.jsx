import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './HeroSection';
import Header from './Header';
import Footer from './Footer';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Blogs from './Blogs';
import AboutSection from './AboutSection';
import { apiUrl } from '../common/http';
import { useEffect, useState } from 'react';
import LatestServices from '../common/LatestServices';
import LatestProject from '../common/LatestProject';

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
          <LatestProject/>
        </main> 
        
        <Testimonials/>
        <Blogs/>
        <Footer/>
        
        </>
    )
}

export default Home;