import {useState, useEffect} from 'react'

const useReviewFetch = (url) => {
    const [review, setReview] = useState([]);
    const [reviewErr, setReviewError] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        console.log('i am invoked');
        setIsLoading(true)
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
                console.log(review);
                setReview(review);
                setReviewError(null);
                setIsLoading(false)
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
    
    return {review, reviewErr, setReview,isLoading}
}
 
export default useReviewFetch;