import {useState, useEffect, useRef} from 'react'

const useReviewPaginationFetch = (url,offset,perPage) => {
    const [review, setReview] = useState([]);
    const [reviewErr, setReviewError] = useState(null);
    const numPages = useRef(null) 

    useEffect(() => {
        const abortConst = new AbortController();

            fetch(url, {signal: abortConst.signal})
            .then(res => {
                console.log(res)
                if(!res.ok){
                    throw Error("NOOB")
                }
                return res.json();
            })
            .then((review) => {
                //for now slice only 5 reviews?
                console.log(`offset is ${offset}, perpage is ${perPage}`);
                let haha = review.slice(offset,perPage+offset) 
                console.log(haha);
                setReview(haha);
                setReviewError(null);
                numPages.current = Math.ceil(review.length/perPage) 
                console.log(`numpages is ${numPages.current}`);
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log('no fetch')
                }
                else{
                    setReviewError(err.message)
                }
            }) 

        return () => abortConst.abort()
    }, [url,offset])
    
    return {review, reviewErr, setReview, numPages}
}
 
export default useReviewPaginationFetch;