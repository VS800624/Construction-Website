import Blogs from "./home/Blogs";
import Hero from "./common/Hero";
import Footer from "./home/Footer";
import Header from "./home/Header";

const BlogsPage = () => {
    return (
        <>
        <Header/>
        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading='Blogs'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />
           <Blogs/>
        </main>
        <Footer/>
        </>
    )
}

export default BlogsPage;