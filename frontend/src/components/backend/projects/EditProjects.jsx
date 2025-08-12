import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Footer from "../../home/Footer";
import Header from "../../home/Header";
import { useForm } from "react-hook-form";
import { useMemo, useRef, useState } from "react";
import { apiUrl, fileUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';


const EditProjects = ({placeholder}) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [project, setProject] = useState([]);

    
        const config = useMemo(() => ({
                readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                placeholder: placeholder || 'Content'
            }),
            [placeholder]
        );

        const params = useParams();
        
         const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl+ 'projects/'+ params.id,{
                'method' : 'GET',
                "headers": {
                    "Content-type" : "application/json",
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${token()}`
                }
            })
            const result = await res.json();
            setProject(result.data);
            setContent(result.data.content)
            return {
                title : result.data.title,
                slug : result.data.slug,
                short_desc : result.data.short_desc,
                construction_type : result.data.construction_type,
                location : result.data.location,
                sector : result.data.sector,
            }
        }
      });
    
      const navigate = useNavigate()

      const onSubmit = async (data) => {
            const newData = { ...data, "content": content, "imageId": imageId}
            // console.log(data)
           try {
            const res = await fetch(apiUrl + 'projects/'+params.id,{
                'method' : 'PUT',
                'headers' : {
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
                navigate('/admin/projects')
            }else {
                toast.error(result.message)
              }  
           } catch(error) {
             console.error("Error fetching projects:", error);
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
                                    <h4 className="h5">Projects / Edit</h4>
                                    <Link to="/admin/projects" className="btn btn-primary">Back</Link>
                                </div>
                                <hr />
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Title</label>
                                        <input
                                        {
                                            ...register('title',{
                                                required : 'The title field is required'
                                            })
                                        }
                                        type="text" placeholder="Title" className={`form-control ${errors.title && 'is-invalid'}`}/>
                                        {
                                            errors.title && <p className="invalid-feedback">{errors.title?.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Slug</label>
                                        <input
                                        {
                                            ...register('slug',{
                                                required : 'The slug field is required'
                                            })
                                        }
                                        type="text" placeholder="Slug" className={`form-control ${errors.slug && 'is-invalid'}`}/>
                                        {
                                            errors.slug && <p className="invalid-feedback">{errors.slug?.message}</p>
                                        }
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor=""  className="form-label">Location</label>
                                                <input
                                                {
                                                    ...register('location')
                                                }
                                                type="text" placeholder="location" className={`form-control`}/>
                                            </div>
                                        </div>
                                   
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor=""  className="form-label">Construction Type</label>
                                                <select name="construction_type" className="form-control"
                                                 {
                                                    ...register('construction_type')
                                                }
                                                >
                                                    <option value="">Construction</option>
                                                    <option value="Residential Construction">Residential Construction</option>
                                                    <option value="Commercial  Construction">Commercial Construction</option>
                                                    <option value="Industrial Construction">Industrial Construction</option>
                                                    <option value="Infrastructure Construction">Infrastructure Construction</option>
                                                </select>
                                            </div>
                                        </div>
                                     </div>

                                      <div className="row">

                                         <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor=""  className="form-label">Sector</label>
                                                <select name="construction_type" className="form-control"
                                                 {
                                                    ...register('sector')
                                                }
                                                >
                                                    <option value="">Sector</option>
                                                    <option value="Health">Health</option>
                                                    <option value="Education">Education</option>
                                                    <option value="Corporate">Corporate</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="">Status</label>
                                                <select 
                                                {
                                                    ...register('status')
                                                }
                                                className="form-control">
                                                    <option value="1">Active</option>
                                                    <option value="0">Block</option>
                                                </select>
                                        </div>
                                        </div>
                                   
                                     </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Short Description</label>
                                        <textarea
                                         {
                                            ...register('short_desc')
                                        }
                                        type="text" placeholder="Short Description" className="form-control" rows={4}></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor=""  className="form-label">Content</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => {}}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="">Image</label>
                                        <br />
                                        <input onChange={handleFile} type="file" />
                                    </div>
                                    <div className="pb-3">
                                        {
                                            project.image && <img src={fileUrl+ 'uploads/projects/small/' +project.image} alt="" />
                                        }
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

export default EditProjects;