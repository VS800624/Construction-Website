import { useNavigate } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";

const Login = () => {

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)
  try {
    const res = await fetch("http://localhost:8000/api/authenticate", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }); 

    const result = await res.json();

    if (result.status == false) {
        toast.error(result.message)
    } else {
        const userInfo = {
            id: result.id,
            token: result.token
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        login(userInfo)
        navigate('/admin/dashboard')
    }
    // console.log(result);
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};


//    or with axios
//   const onSubmit = async (data) => {
//   try {
//     const response = await axios.post('http://localhost:8000/api/authenticate', data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(response.data);
//   } catch (error) {
//     console.error('Error during authentication:', error);
//   }
// };

  return (
    <>
      <Header />
      <main>
        <div className="container my-5 d-flex justify-content-center">
          <div className="login-form my-5">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="mb-3">Login Here</h4>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                                }
                      })}
                      type="text"
                      placeholder="Email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "This field is required",
                      })}
                      type="text"
                      placeholder="Email"
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
