import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Footer from "../../home/Footer";
import Header from "../../home/Header";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";


const CreateTestimonials = () => {

    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

        const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate()
      
      const onSubmit = async (data) => {
            const newData = { ...data, "imageId": imageId}
            // console.log(data)
           try {
            const res = await fetch(apiUrl + 'testimonials',{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${token()}`
                },
                body: JSON.stringify(newData)
            });
            const result = await res.json();
            console.log(result)
    
            if (result.status == true){
                toast.success(result.message)
                navigate('/admin/testimonials')
            }else {
                toast.error(result.message)
              }  
           } catch(error) {
             console.error("Error fetching testimonials:", error);
           }
        }

        const handleFile = async (e) => {
                const formData = new FormData();
                const file = e.target.files[0];
                formData.append("image", file);
                setIsDisable(true);
        
                try {
                    const res = await fetch(apiUrl+'temp-images', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token()}`
                        },
                        body: formData
                    })
                    const result = await res.json();
                    console.log(result);
        
                    setIsDisable(false)
                    if (result.status == false) {
                        toast.error(result.errors.image[0])
                    } else {
                        setImageId(result.data.id)
                    }
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
        };
    
    return <>
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
                                    <h4 className="h5">Testimonials / Create</h4>
                                    <Link to="/admin/testimonials" className="btn btn-primary">Back</Link>
                                </div>
                                <hr />
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Testimonials</label>
                                        <textarea
                                        {
                                            ...register('testimonial',{
                                                required : 'The testimonial field is required'
                                            })
                                        }
                                        type="text" placeholder="Testimonial" className={`form-control ${errors.testimonial && 'is-invalid'}`} rows={4}></textarea>
                                        {
                                            errors.testimonial && <p className="invalid-feedback">{errors.testimonial?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Citation</label>
                                        <input
                                        {
                                            ...register('citation',{
                                                required : 'The citation field is required'
                                            })
                                        }
                                        type="text" placeholder="Citation" className={`form-control ${errors.citation && 'is-invalid'}`}/>
                                        {
                                            errors.citation && <p className="invalid-feedback">{errors.citation?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Designation</label>
                                        <input
                                        {
                                            ...register('designation')
                                        }
                                        type="text" placeholder="Designation" className={`form-control `}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="">Image</label>
                                        <br />
                                        <input onChange={handleFile} type="file" />
                                    </div>

                                     <div className="mb-3">
                                        <label htmlFor="" className="mb-2">Status</label>
                                        <select 
                                        {
                                            ...register('status')
                                        }
                                        className="form-control">
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                    </div>  
                                    
                                    <button disabled={isDisable}  className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </main>

        <Footer/>
        </>
}

export default CreateTestimonials;