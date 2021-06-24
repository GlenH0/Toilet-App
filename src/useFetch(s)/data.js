import {useState, useEffect} from 'react'

const lala = () => {
    return 'lol'
}

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); 


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
        .then((data) => {
            console.log(data.rating);
            setData(data);
            setError(null);
        })
        .catch((err) => {
            if(err.name === 'AbortError'){
                console.log('no fetch')
            }
            else{
                setError(err.message)
            }
        })

        return () => abortConst.abort()
    }, [url])
    
    return {data,error,setData}
}
 
export default useFetch;