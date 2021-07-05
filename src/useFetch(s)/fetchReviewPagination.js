import {useState, useEffect, useRef} from 'react'
import API_URL from '../helper/urlConfig';

const useReviewPaginationFetch = (url,offset,perPage) => {
    const cache = useRef({})
    const [review, setReview] = useState([]);
    const [reviewErr, setReviewError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const numPages = useRef(null) 

    function sortReviewByDate(reviews){
        return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
    }
    

    useEffect(() => {
        
        const abortConst = new AbortController();
            const fetchReview = async() => {
                setIsLoading(true)

                //this is for offset change
                if (cache.current[API_URL + url]){
        
                    //update the cache based on new addition to the review
                    //cache.current[url] = review 
                    let reviewsPerPage = cache.current[API_URL + url].slice(offset,perPage+offset) 
                    setReview(reviewsPerPage)
                    setIsLoading(false)
                }
                else {
                    try {
                        const response = await fetch(API_URL + url)
                        const data = await response.json()
                        cache.current[API_URL + url] = sortReviewByDate(data)
                        let reviewsPerPage = data.slice(offset,perPage+offset) 
                        setReview(reviewsPerPage)
                        numPages.current = Math.ceil(data.length/perPage)
                        console.log(numPages.current);
                        setReviewError(null)    
                        setIsLoading(false)
                    } catch (error) {
                        setReviewError(error.message)
                    }
                    
                }
            }

            fetchReview()

            // fetch(url, {signal: abortConst.signal})
            // .then(res => {
            //     console.log(res)
            //     if(!res.ok){
            //          throw Error("NOOB")
            //     }
            //     return res.json();
            // })
            // .then((review) => {
            //     //for now slice only 5 reviews?
            //     console.log(`offset is ${offset}, perpage is ${perPage}`);
            //     let haha = review.slice(offset,perPage+offset) 
            //     console.log(haha);
            //     setReview(haha);
            //     setReviewError(null);
            //     numPages.current = Math.ceil(review.length/perPage) 
            //     console.log(`numpages is ${numPages.current}`);
            // })
            // .catch((err) => {
            //     if(err.name === 'AbortError'){
            //         console.log('no fetch')
            //     }
            //     else{
            //         setReviewError(err.message)
            //     }
            // })

        return () => abortConst.abort()
    }, [url,offset,perPage])
    
    return {review, reviewErr, setReview, numPages,isLoading}
}
 
export default useReviewPaginationFetch;