import { useEffect, useState } from "react";
import Hero from "./common/Hero";
import { apiUrl, fileUrl } from "./common/http";
import Footer from "./home/Footer";
import Header from "./home/Header";
import { Link, useParams } from "react-router-dom";
import Testimonials from "./home/Testimonials";

const BlogDetail = () => {

    const [article , setArticle] = useState([])
    const [latestArticles , setLatestArticles] = useState([])
    const params = useParams()

    const fetchLatestArticles = async () => {
        const res = await fetch(apiUrl+"get-latest-articles",{
            method: "GET"
        });
        const result = await res.json()
        console.table(result.data)
        setLatestArticles(result.data)
    }

    const fetchArticle = async () => {
        const res = await fetch(apiUrl+"get-article/"+params.id, {
            method: "GET"
        });
        const result = await res.json()
        setArticle(result.data)
    }
    
    useEffect(() => {
        fetchArticle();
        fetchLatestArticles();
    }, [params.id])
    
     return(
        <>
        <Header/>

        <main>
            <Hero preHeading ='Quality. Integrity. Value.' 
           heading="Blogs & News"
           text=''
           />
            <section className="section-11">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-8">
                            <h2>{article.title}</h2>
                            <div className="pb-3">by <strong>{article.author}</strong> on {article.created_at} </div>
                            <div className="pe-md-5 pb-3">
                                <img
                                    src={`${fileUrl}uploads/articles/large/${article.image}`}
                                    alt={article.title}
                                    className="w-100"
                                />
                            </div>
                            <div dangerouslySetInnerHTML ={{__html: article.content}}>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-shadow border-0 sidebar">
                                <div className="card-body px-5 py-4">
                                    <h3 className="mt-2 mb-3">Latest Blogs</h3>
                                    {
                                        latestArticles && latestArticles.map((article) => {
                                            return (
                                            <div className="d-flex border-bottom mb-3 pb-2">
                                                <div className="pe-3 pb-2">
                                                    <Link to={`/blog/${article.id}`}>
                                                    <img
                                                    src={`${fileUrl}uploads/articles/small/${article.image}`}
                                                    alt={article.title}
                                                    width={100}
                                                />
                                                </Link>
                                                </div>
                                            <Link to={`/blog/${article.id}`} className="title">{article.title}</Link>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer/>
        </>
    )
}

export default BlogDetail;