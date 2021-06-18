
import { Link } from 'react-router-dom';
import useFetch from './useFetch(s)/data'
import './Home.css'
import Carousel from './carousel/Carousel'

const Home = () => {
    const { data, error } = useFetch('/api/toilets')
    data.sort((a, b) => b.rating - a.rating)

    // output of html
    return (
        <div className="home">
            <div className="top">
                <img src="banner.png" alt="NTU" />
                <Link to={'/map'}>
                    <button>Map</button>
                </Link>
            </div>
            <div className="btm">
                <h1><span className='btmTitle'>THE</span> FINEST</h1>
                {error && <div>{error}</div>}

                <div className="btmToilet">
                    <Carousel show={4}>
                        {data.map((x) => (
                            <div className="btmContent" key={x._id}>
                                <div className="btmImg">
                                    <Link className="btmImg-hover" to={`/toiletdetails/${x._id}`}>
                                        <img src={x.image_url} alt="" />
                                    </Link>
                                </div>
                                <div className="details">
                                    <h2>{x.name}</h2>
                                    <p><span>{x.rating}</span> stars</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Home;