import Hero from "./common/Hero";
import Footer from "./home/Footer"
import Header from "./home/Header"
import ServiceImg from '../assets/images/construction1.jpg'
import { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./common/http";

const Services = () => {

     const[services, setServices] = useState([])
    const fetchServices = async () => {
        const res = await fetch(apiUrl+'get-services',{
           'method' : 'GET',
        })
        const result = await res.json();
        console.log(result)
        setServices(result.data);
    }
    
    useEffect(() => {
        fetchServices()
    }, []);
    
    
    return (
        <>
        <Header/>
        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading='Services'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />

           {/* Our Services */}

            <section className='section-3 bg-light py-5'>
                       <div className="container py-5">
                           <div className='section-header text-center'>
                               <span>Our services</span>
                               <h2>Our Construction services</h2>
                               <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                           </div>
                            <div className="row pt-4">
                                {
                                    services && services.length > 0 ? (
                                        services.map((service) => (
                                            <div className="col-md-3 col-lg-4" key={service.id}>
                                                <div className="item">
                                                    <div className="service-image">
                                                        <img
                                                            src={`${fileUrl}uploads/services/small/${service.image}`}
                                                            alt={service.title || "Service"}
                                                            className="w-100"
                                                        />
                                                    </div>
                                                    <div className="service-body">
                                                        <div className="service-title">
                                                            <h3>{service.title}</h3>
                                                            <div className="service-content">
                                                                <p>{service.short_desc}</p>
                                                            </div>
                                                            <a href="#!" className="btn btn-primary small">
                                                                Read More
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-md-3 col-lg-3">
                                    <div className='item'>
                                        <div className='service-image'>
                                            <img src={ServiceImg} alt="" className='w-100'/>
                                        </div>
                                        <div className='service-body'>
                                            <div className="service-title">
                                                <h3>Specialty Construction</h3>
                                                <div className='service-content'>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, Ipsam, qui? Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit.</p>
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


export default Services;