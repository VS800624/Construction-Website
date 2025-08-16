import { useEffect, useState } from 'react'
import ServiceImg from '../../assets/images/construction1.jpg'
import { apiUrl, fileUrl } from './http'
import { Link } from 'react-router-dom'

const LatestServices = () => {

    const[services, setServices] = useState([])
    const fetchLatestServices = async () => {
        const res = await fetch(apiUrl+'get-latest-services?limit=4',{
           method : 'GET',
        })
        const result = await res.json();
        console.log(result)
        setServices(result.data);
    }
    
    useEffect(() => {
        fetchLatestServices()
    }, []);
    
    return  (
    <section className='section-3 bg-light py-5'>
                <div className="container-fluid py-5">
                    <div className='section-header text-center'>
                        <span>Our services</span>
                        <h2>Our Construction services</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-4">
                        {
                            services && services.length > 0 ? (
                                services.map((service) => (
                                    <div className="col-md-3 col-lg-3" key={service.id}>
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
                                                    <Link to={`/service/${service.id}`} className="btn btn-primary small">
                                                        Read More
                                                    </Link>
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
                                                <Link to="" className='btn btn-primary small'>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                        
                    </div>
                </div>
            </section>       
)}


export default LatestServices;