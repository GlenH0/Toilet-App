import {useState, useEffect} from 'react'

const useReviewFetch = (url) => {
    const [review, setReview] = useState([]);
    const [reviewErr, setReviewError] = useState(null); 


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
                setReview(review);
                setReviewError(null);
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
    }, [url])
    
    return {review, reviewErr, setReview}
}
 
export default useReviewFetch;