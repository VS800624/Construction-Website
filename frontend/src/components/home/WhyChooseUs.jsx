import { whyChoose } from "../../data"

const WhyChooseUs = () => {
    return (
          <section className='section-4 py-5'>
                    <div className='container py-5'>
                        <div className="section-header text-center">
                        <span>Why Choose Us</span>
                            <h2>Discover our wide variety of projects.</h2>
                            <p>Created in close partnership with our clients and collaborators, this approach merges industry expertise, <br /> decades of experience, innovation, and flexibility to consistently deliver excellence.</p>
                         </div>
                         <div className="row pt-4">
                             {whyChoose.map((data, index) => {
                            return (
                            <div key={index} className="col-md-4">
                                <div className="card shadow borer-0 p-4 mb-[20px]">
                                    <div className="card-icon pb-2 ">
                                        <img src={data.icon} alt="" />
                                    </div>
                                    <div className="card-title">
                                        <h3>{data.title}</h3>
                                    </div>
                                        <p>{data.paragraph}</p>
                                </div>
                            </div>           
                            )
                        })}
                         </div>
                    </div>
                </section>
    )
}

export default WhyChooseUs