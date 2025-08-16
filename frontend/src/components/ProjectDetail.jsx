import { Link, useParams } from "react-router-dom";
import { apiUrl, fileUrl } from "./common/http";
import Footer from "./home/Footer";
import Testimonials from "./home/Testimonials";
import Hero from "./common/Hero";
import Header from "./home/Header";
import { use, useEffect, useState } from "react";


const ProjectDetail = () => {

    const [project, setProject] = useState([])
    const [projects, setProjects] = useState([])
    const params = useParams()

    const fetchProjects = async () => {
        const res = await fetch(apiUrl+ 'get-projects',{
            method: "GET"
        });
        const result = await res.json()
        setProjects(result.data)
    }
    
   const fetchProject = async () => {
        const res = await fetch(apiUrl+ "get-project/"+ params.id,{
            method: "GET"
        });
        const result = await res.json()
        console.log(result)
        setProject(result.data) 
    }
    
    useEffect(() => {
        fetchProject();
        fetchProjects();
    }, [params.id])
    
     return(
        <>
        <Header/>

        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading={project.title}
           text=''
           />
            <section className="section-10">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-shadow border-0 sidebar">
                                <div className="card-body px-4 py-4">
                                    <h3 className="mt-2 mb-3">Our projects</h3>
                                    <ul>{
                                        projects && projects.map((project) => {
                                            return (
                                            <li key={project.id}>
                                                <Link to={`/project/${project.id}`}>{project.title}</Link>
                                            </li>
                                            )
                                        })}
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div>
                                <img
                                    src={`${fileUrl}uploads/projects/large/${project.image}`}
                                    alt={project.title}
                                    className="w-100"
                                />
                            </div>
                            <h3 className="py-3">{project.title}</h3>
                            <div dangerouslySetInnerHTML={{__html: project.content}}>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Testimonials/>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer/>
        </>
    )
}

export default ProjectDetail;