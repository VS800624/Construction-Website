import { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Footer from "../../home/Footer";
import Header from "../../home/Header";
import { apiUrl, token } from "../../common/http";
import { Link } from "react-router-dom";

const Show = () => {
    const [services, setServices] = useState([]);

   const fetchServices = async () => {
    try {
        const res = await fetch(apiUrl+'services', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setServices(result.data)
        console.log(result);
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

    useEffect(() => {
        fetchServices();
    }, [])
    
    return (
         <>
            <Header/>

            <main >
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3">
                            {/* Sidebar */}
                             <Sidebar/>
                        </div>
                        <div className="col-md-9 ">
                            {/* Dashboard */}
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className="h5">Services</h4>
                                        <Link to="/admin/services/create" className="btn btn-primary">Create</Link>
                                    </div>
                                    <hr />

                                   <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Slug</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                services && services.map((service, index) => {
                                                   return (
                                                        <tr key={`service-${service.id}`}>
                                                            <td>{index+1}</td>
                                                            <td>{service.title}</td>
                                                            <td>{service.slug}</td>
                                                            <td>{
                                                            service.status == 1 ? 'Active' : 'Blog'
                                                            }</td>
                                                            <td>
                                                                <Link to="" className="btn btn-primary btn-sm">Edit</Link>
                                                                <Link to="" className="btn btn-secondary btn-sm ms-2">Delete</Link>
                                                            </td>
                                                        </tr>
                                                   )
                                                })
                                            }
                                        </tbody>
                                    </table> 
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Show;