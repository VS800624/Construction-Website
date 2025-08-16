import { useEffect, useState } from "react";
import Hero from "./common/Hero";
import { apiUrl, fileUrl } from "./common/http";
import Footer from "./home/Footer";
import Header from "./home/Header";
import { Link, useParams } from "react-router-dom";
import Testimonials from "./home/Testimonials";


const ServiceDetail = () => {

    const [service, setService] = useState([])
    const [services, setServices] = useState([])
    const params = useParams()

    const fetchServices = async () => {
        //  const res = await fetch(`${apiUrl}get-service/${params.id}`,)
        const res = await fetch(apiUrl+ "get-services",{
            method: "GET"
        });
        const result = await res.json()
        // console.log(result)
        setServices(result.data) 
    }
    
    const fetchService = async () => {
        //  const res = await fetch(`${apiUrl}get-service/${params.id}`,)
        const res = await fetch(apiUrl+ "get-service/"+ params.id,{
            method: "GET"
        });
        const result = await res.json()
        // console.log(result)
        setService(result.data) 
    }

    useEffect(() => {
        fetchService();
        fetchServices();
    }, [params.id])
    
    return(
        <>
        <Header/>

        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading={service.title}
        //    heading={`${service.title}`} if we want to convert it in string but it is not needed as it already a string
           text=''
           />
            <section className="section-10">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-shadow border-0 sidebar">
                                <div className="card-body px-4 py-4">
                                    <h3 className="mt-2 mb-3">Our Services</h3>
                                    <ul>{
                                        services && services.map((service) => {
                                            return (
                                            <li key={service.id}>
                                                <Link to={`/service/${service.id}`}>{service.title}</Link>
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
                                    src={`${fileUrl}uploads/services/large/${service.image}`}
                                    alt={service.title}
                                    className="w-100"
                                />
                            </div>
                            <h3 className="py-3">{service.title}</h3>
                            <div dangerouslySetInnerHTML={{__html: service.content}}>
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

export default ServiceDetail;