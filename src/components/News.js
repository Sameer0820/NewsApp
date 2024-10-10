import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props, { country = 'in', pageSize = 8, category = 'general' }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData?.articles)
        setTotalResults(parsedData?.totalResults)
        console.log(parsedData)
        setLoading(false)
        props.setProgress(100);
    } 
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}-NewsBrief`;
        updateNews();
        // eslint-disable-next-line
    },[])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults( parsedData.totalResults)
        setLoading(false)
    };
    return (
        <>
            <h1 className='text-center' style={{ margin: '35px 0px', marginTop:"90px" }}>NewsBrief - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            if(element?.title !== "[Removed]"){
                                return <div className="col-md-4" key={element?.title}>
                                <NewsItem title={element?.title ? element.title : ""} author={element?.author} date={element?.publishedAt} source={element?.source.name} description={element?.description ? element?.description : ""} newsUrl={element?.url} imageUrl={element?.urlToImage ? element?.urlToImage : "https://png.pngtree.com/thumb_back/fh260/background/20220216/pngtree-news-concept-daily-news-on-wall-background-age-headline-grunge-background-photo-image_23741784.jpg"} />
                            </div>
                            }else{
                                return null;
                            }
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News