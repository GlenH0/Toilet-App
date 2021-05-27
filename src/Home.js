
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);   
    
    // local fetch due to sorting
    useEffect(() => {
        const abortConst = new AbortController();

        fetch('/api/toilets', {signal: abortConst.signal})
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw Error("NOOB")
            }
            return res.json();
        })
        .then((data) => {
            data.sort((a,b) => a.rating - b.rating).reverse();
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
    },[])   

    // output of html
    return ( 
        <div className="home">
            <div className="top">
                <img src="banner.png" alt="NTU"/>
                <button>Map</button>
            </div>
            <div className="btm">
                <h1><span className='btmTitle'>THE</span> FINEST</h1>
                {error && <div>{error}</div>}
                <div className="btmToilet">
                {data.filter(rate => rate.rating > 5).slice(0, 3).map((x) => ( 
                     <div className="btmContent" key={x._id}>
                        <div className="btmImg">
                            <Link to={`/toiletdetails/${x._id}`}>
                                <img src={x.image_url} alt=""/>
                            </Link>
                        </div>
                        <div className="details">
                            <h2>{x.name}</h2>
                            <p>Ratings: {x.rating} stars</p>  
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
     );
}
 
export default Home;