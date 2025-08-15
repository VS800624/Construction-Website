import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Footer from "../../home/Footer";
import Header from "../../home/Header";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import { apiUrl, fileUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const EditMembers = () => {

    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [members, setMembers] = useState([])
    const params = useParams()

        const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        defaultValues: async () => {
            const res =  await fetch(apiUrl+ "members/" +params.id, {
                method : "GET",
                headers: {
                    "Content-type" : "application/json",
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token()}`
                }
            });
            const result =  await res.json()
            setMembers(result.data);
            return {
                "name" : result.data.name,
                "job_title" : result.data.job_title,
                "linkedin_url" : result.data.linkedin_url,
                "status" : result.data.status,
            }
        }
      });

      const navigate = useNavigate()

      const onSubmit = async(data) => {
        const newData = { ... data, "imageId" : imageId}
        try {
            const res = await fetch(apiUrl+ "members/"+params.id,{
                method : "PUT",
                headers: {
                    "Content-type" : "application/json",
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token()}`
                },
                body : JSON.stringify(newData)
            });
            const result = await res.json()
             if (result.status == true){
                toast.success(result.message)
                navigate('/admin/members')
            }else {
                toast.error(result.message)
              }  
        } catch (error) {
             console.error("Error uploading file:", error);
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
                                    <h4 className="h5">Members / Create</h4>
                                    <Link to="/admin/members" className="btn btn-primary">Back</Link>
                                </div>
                                <hr />
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input
                                        {
                                            ...register('name',{
                                                required : 'The name field is required'
                                            })
                                        }
                                        type="text" placeholder="Name" className={`form-control ${errors.name && 'is-invalid'}`}/>
                                        {
                                            errors.name && <p className="invalid-feedback">{errors.name?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Job Title</label>
                                        <input
                                        {
                                            ...register('job_title',{
                                                required : 'The Job title field is required'
                                            })
                                        }
                                        type="text" placeholder="Job Title" className={`form-control ${errors.job_title && 'is-invalid'}`}/>
                                        {
                                            errors.job_title && <p className="invalid-feedback">{errors.job_title?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Linkedin Url</label>
                                        <input
                                        {
                                            ...register('linkedin_url')
                                        }
                                        type="text" placeholder="Linkedin Url" className={`form-control `}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="">Image</label>
                                        <br />
                                        <input onChange={handleFile} type="file" />
                                    </div>
                                    <div className="pb-3">
                                        {
                                            members.image && <img src={fileUrl+ 'uploads/members/' +members.image} alt="" width={100}/>
                                        }
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
                                    
                                    <button disabled={isDisable}  className="btn btn-primary">Update</button>
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

export default EditMembers;