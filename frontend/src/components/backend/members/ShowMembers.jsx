import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Header from "../../home/Header";
import Footer from "../../home/Footer";
import { useEffect, useState } from "react";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const ShowMembers = () => {

    const [members, setMembers] = useState([])

    const fetchMembers = async () => {
        const res = await fetch(apiUrl+ "members",{
            method:  "GET",
            headers : {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        });
        const result = await res.json()
        // console.log(result)
        setMembers(result.data)
    }

    const deleteMember = async (id) => {
        if (confirm("Are you sure you want to delete this member?")){
            const res = await fetch(apiUrl+ "members/" +id,{
                method: "DELETE",
                headers : {
                    "Content-type" : "application/json",
                    "Accept" : "application/json" ,
                    "Authorization" : `Bearer ${token()}`
                }
            });
            const result = await res.json()
            if (result.status == true) {
                    const newMembers = members.filter(member => member.id != id)
                    setMembers(newMembers)
                    toast.success(result.message)
                } else {
                    toast.error(result.message)
                }
        }
    }

    useEffect(() => {
        fetchMembers()
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
                                        <h4 className="h5">members</h4>
                                        <Link to="/admin/members/create" className="btn btn-primary">Create</Link>
                                    </div>
                                    <hr />

                                   <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Job Title</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                members && members.map((member,index) => {
                                                   return (
                                                        <tr key={`service-${members.id}`}>
                                                            <td>{index+1}</td>
                                                            <td>{member.name}</td>
                                                            <td>{member.job_title}</td>
                                                            <td>{
                                                            member.status == 1 ? 'Active' : 'Blog'
                                                            }</td>
                                                            <td>
                                                                <Link to={`/admin/members/edit/${member.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                                                <Link onClick={() => deleteMember(member.id)} to="" className="btn btn-secondary btn-sm ms-2">Delete</Link>
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

export default ShowMembers;