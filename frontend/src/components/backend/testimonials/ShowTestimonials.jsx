import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Header from "../../home/Header";
import Footer from "../../home/Footer";
import { useEffect, useState } from "react";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";


const ShowTestimonials = () => {

    const [testimonials, setTestimonials] = useState([])

    const fetchTestimonials = async () => { 
        const res = await fetch(apiUrl+ 'testimonials',{
            method : 'GET',
            headers: {
                'Content-type' : 'application-json',
                'Accept' : 'application-json',
                'Authorization' : `Bearer ${token()}`
            }
        });
        const result = await res.json()
        // console.log(result)
        setTestimonials(result.data);
    }

    const deleteTestimonial = async (id) => {
        if (confirm("Are you sure you want to delete this testimonial")){
            const res = await fetch(apiUrl+"testimonials/" + id, {
                method: "DELETE",
                headers : {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer ${token()}`
                    },
            });
            const result = await res.json();
            if (result.status == true) {
                    const newTestimonials = testimonials.filter(testimonial => testimonial.id != id)
                    setTestimonials(newTestimonials)
                    toast.success(result.message)
                } else {
                    toast.error(result.message)
                }
        }
    }
    
    useEffect(() => {
        fetchTestimonials()
    }, [])
    
     return  <>
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
                                        <h4 className="h5">Testimonials</h4>
                                        <Link to="/admin/testimonials/create" className="btn btn-primary">Create</Link>
                                    </div>
                                    <hr />

                                   <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Testimonial</th>
                                                <th>Citation</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                testimonials && testimonials.map((testimonial, index) => {
                                                   return (
                                                        <tr key={`service-${testimonials.id}`}>
                                                            <td>{index+1}</td>
                                                            <td>{testimonial.testimonial}</td>
                                                            <td>{testimonial.citation}</td>
                                                            <td>{
                                                            testimonial.status == 1 ? 'Active' : 'Blog'
                                                            }</td>
                                                            <td>
                                                                <Link to={`/admin/testimonials/edit/${testimonial.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                                                <Link onClick={() => deleteTestimonial(testimonial.id)} to="" className="btn btn-secondary btn-sm ms-2">Delete</Link>
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
}

export default ShowTestimonials;