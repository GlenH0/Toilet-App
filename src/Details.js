import { useParams } from "react-router";
import useFetch from './data'; 

const ToiletDetails = () => {
    const {_id} = useParams()
    const {data, error} = useFetch('/api/toilets' + _id)
    return ( 
        <div className="details">
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <h2>hi</h2>
                    <h2>{data.name}</h2>
                    {/* <img src={data.image_url} alt="" /> */}
                </div>
            )}
        </div>
     );
}
 
export default ToiletDetails;