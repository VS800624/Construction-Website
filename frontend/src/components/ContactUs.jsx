import Hero from "./common/Hero";
import Footer from "./home/Footer"
import Header from "./home/Header"

const ContactUs = () => {
    return (
        <>
        <Header/>
        <main>
        <Hero preHeading ='Quality. Integrity. Value.' 
           heading='Contact Us'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />
        </main>

        <section className="section-9 py-5">
            <div className="container">
                <div className='section-header text-center'>
                        <h2>Contact Us</h2>
                        <p>Our dedicated experts are here to help you with any of your questions, contact us by <br /> filling out the form below and we will be in touch shortly.</p>
                    </div>
               <div className="row mt-5">
                    <div className="col-md-3">
                        <div className="card shadow border-0 mb-5">
                            <div className="card-body p-4">
                                <h3>Call Us:</h3>
                                <div>
                                <a href="tel:888-000-0000">(888-000-0000)</a>
                                </div>
                                <div>
                                <a href="tel:222-123-12345">(222-123-12345)</a>
                                </div>

                                <h3 className="mt-4">You can write us:</h3>
                                <a href="mailto:example@example.com">example@example.com</a> <br />
                                <a href="mailto:info@example.com">info@example.com</a>

                                <h3 className="mt-4">Address:</h3>
                                <div>B-18X, Rajaji Puram <br />
                                Lucknow, Uttar Pradesh, 226017 <br /> 0522400XXXX
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow border-0">
                            <div className="card-body p-5">
                                <form action="">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Name"/>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="" className="form-label">Email</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Email"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="" className="form-label">Phone</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Phone No."/>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="" className="form-label">Subject</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="Subject"/>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="form-label">Message</label>
                                    <textarea name="" id="" rows={5} placeholder="Message" className="form-control form-control-lg"></textarea>
                                </div>
                                <button className="btn btn-primary large mt-3">Submit</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default ContactUs;