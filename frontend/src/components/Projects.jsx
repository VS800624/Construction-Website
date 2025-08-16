import Hero from "./common/Hero";
import Footer from "./home/Footer";
import Header from "./home/Header";
import ConstructionImg from '../assets/images/construction2.jpg'
import { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./common/http";
import { Link } from "react-router-dom";

const Projects = () => {

    const [projects, setProjects] = useState([])

    const fetchProjects = async () => {
        const res = await fetch(apiUrl+ 'get-projects',{
            method : 'GET'
        });
        const result = await res.json();
        if (result.status == true) {
            setProjects(result.data)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])
    
    return (
        <>
        <Header/>
        <main>
        <Hero preHeading ='Quality. Integrity. Value.' 
           heading='Our Projects'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />
            {/* Our Projects */}
           <section className='section-3 bg-light py-5'>
                       <div className="container py-5">
                           <div className='section-header text-center'>
                               <span>Our Projects</span>
                               <h2>Discover our diverse range of projects</h2>
                               <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                           </div>
                          <div className="row pt-4">
                                {
                                    projects && projects.length > 0 ? (
                                        projects.map((project) => (
                                            <div className="col-md-4 col-lg-4" key={project.id}>
                                                <div className="item">
                                                    <div className="service-image">
                                                        <img
                                                            src={`${fileUrl}uploads/projects/small/${project.image}`}
                                                            alt={project.title || "Project"}
                                                            className="w-100"
                                                        />
                                                    </div>
                                                    <div className="service-body">
                                                        <div className="service-title">
                                                            <h3>{project.title}</h3>
                                                            <div className="service-content">
                                                                <p>{project.short_desc}</p>
                                                            </div>
                                                            <Link to={`/project/${project.id}`} className="btn btn-primary small">
                                                                Read More
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-md-4 col-lg-4">
                                            <div className='item'>
                                                <div className='service-image'>
                                                    <img src={ConstructionImg} alt="" className='w-100'/>
                                                </div>
                                                <div className='service-body'>
                                                    <div className="service-title">
                                                        <h3>Goa Project 2025</h3>
                                                        <div className='service-content'>
                                                            <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                                                        </div>
                                                        <a href="#" className='btn btn-primary small'>Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
        
                                }
                                                    
                            </div>
                       </div>
                   </section>
        </main> 
        <Footer/>
        </>
    )
}

export default Projects;
