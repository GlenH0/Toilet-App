import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";


const ReviewBox = (props) => {
    const HandleReply = () => (
        <div>
            <form>
                <textarea required placeholder="Your reply"></textarea>
            </form>
        </div>
        
    )

    return (
        <div className="details-review-content" key={props._id}>
            <p className="details-review-content-input"><span><AiFillMessage /></span>{props.reviewText}</p>
            <p className="details-review-content-inputDate">{props.date.slice(0, 10)}</p>
            <button className="details-review-content-button" onClick={props.handleDelete}><BsFillTrashFill /></button>
            {props.rating && <p>{props.rating} stars</p>}
            
            <div className="details-reviews-content-reply">
            <button onClick={props.handleIndividualReply}>Reply {props._id}</button>
            {/* {console.log(x._id)} */}
            {props.isReply? <HandleReply/> : null}
            </div>
        </div>
    )
}


export default ReviewBox