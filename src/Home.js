
import {Link} from 'react-router-dom';
import useFetch from './data'
import './Home.css'

const Home = () => {
    const {data, error} = useFetch('/api/toilets') 
    data.sort((a,b) => b.rating - a.rating)
    //setData(data)
    // local fetch due to sorting
    

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