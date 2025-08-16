import BlogImg from '../assets/images/construction3.jpg'
import Hero from "./common/Hero";
import Footer from "./home/Footer";
import Header from "./home/Header";
import { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./common/http";
import { Link } from 'react-router-dom';

const BlogsPage = () => {

    const [articles, setArticles] = useState([])

    const fetchArticles = async () => {
        const res = await fetch(apiUrl+'get-articles',{
            method : 'GET'
        });

        const result = await res.json();
        console.log(result)

        if (result.status == true) {
            setArticles(result.data)
        }
    }
    
    useEffect(() => {
        fetchArticles()
    }, [])
    
    return (
        <>
        <Header/>
        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading='Blogs'
           text='We excel at transforming visions into reality through outstanding craftsmanship and precise <br /> attention to detail. With years of experience and dedication to quality.'
           />
           <section className="section-6 bg-light py-5">
                <div className="container">
                    <div className='section-header text-center'>
                        <span>Blogs & News</span>
                        <h2>Article & blog posts</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-3">
                        {
                            articles && articles.length > 0 ? (
                                articles.map((article) => {
                                    return (
                                <div key={article.id} className="col-md-4 mb-4">
                                    <div className="card shadow border-0">
                                        <div className="card-img-top">
                                            <img
                                                src={`${fileUrl}uploads/articles/small/${article.image}`}
                                                alt={article.title}
                                                className="w-[120px]"
                                            />
                                        </div>
                                    <div className="card-body p-4">
                                        <div className='mb-3'>
                                            <Link to={`/blog/${article.id}`} className='title'>{article.title}</Link>
                                        </div>
                                        <Link to={`/blog/${article.id}`} className='btn btn-primary'>Read More</Link>
                                    </div>
                                    </div>
                                </div>
                                    )
                                })
                            ) : (
                                <div className="col-md-4">
                                    <div className="card shadow border-0">
                                        <div className="card-img-top">
                                            <img src={BlogImg} alt="" className='w-100' />
                                        </div>
                                    <div className="card-body p-4">
                                        <div className='mb-3'>
                                            <a href="#" className='title'>Dummy blog title</a>
                                        </div>
                                        <a href="" className='btn btn-primary'>Read More</a>
                                    </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default BlogsPage;