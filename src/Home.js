import { Link } from "react-router-dom";
import useFetch from "./useFetch(s)/data";
import "./Home.css";
import Carousel from "./carousel/Carousel";
import backdrop from "./assets/banner1.jpg";
import Loading from "./helperComponents/Loading";
import Rating from "@material-ui/lab/Rating";

const Home = () => {
  const { data, error, isLoading } = useFetch("/api/toilets");
  data.sort((a, b) => b.rating - a.rating);

  // output of html
  return (
    <div className="home">
      <div className="top">
        <img src={backdrop} alt="NTU" />
        {/* <Link to={'/map'}>
                    <button><span>Map</span></button>
                </Link> */}
      </div>
      <div className="btm">
        <h1>
          <span className="btmTitle">THE</span> FINEST
        </h1>
        {error && <div>{error}</div>}

        <div className="btmToilet">
          {isLoading && <Loading marginRight={0} />}
          <Carousel show={3}>
            {data.map((x) => (
              <div className="btmContent" key={x._id}>
                <div className="btmImg">
                  <Link className="btmImg-hover" to={`/toiletdetails/${x._id}`}>
                    <img src={x.image_url} alt="" />
                  </Link>
                </div>
                <div className="btmImage-details">
                  <h2>{x.name}</h2>
                  <Rating
                    value={x.rating}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
