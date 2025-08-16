import AboutSection from "./home/AboutSection";
import Footer from "./home/Footer";
import Header from "./home/Header";
import Hero from "./common/Hero";
import Testimonials from "./home/Testimonials";
import TeamMembers from "./common/TeamMembers";

const About = () => {
    return (
        <>
        <Header/>
        <main>
           <Hero preHeading ='Quality. Integrity. Value.' 
           heading='About Us'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />
            <AboutSection/>

            {/* Our Team */}

            <TeamMembers/>

            <Testimonials/>
        </main>
        <Footer/>
        </>
    )
}


export default About;