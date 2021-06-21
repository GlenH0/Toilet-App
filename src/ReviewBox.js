import { AiFillMessage } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const ReviewBox = (props) => {
    // console.log(props);
    const [replyText, setReplyText] = useState('')

    const HandleReply = () => (
        <div>
            <form>
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Your reply" required></textarea>

                {console.log(props.replyText)}
                <div className="reply-btn">
                    {/* className={props.replyText.length > 0 ? "gotText" : "noText"} */}
                    <button >Submit</button>
                    <button>Cancel</button>
                </div>
            </form>
        </div>
        
    )

    return (
        <div className="details-review-content" key={props._id}>
            <div className="details-review-all-content">
                <p className="details-review-content-input"><span><AiFillMessage /></span>{props.reviewText}</p>
                <p className="details-review-content-inputDate">{props.date.slice(0, 10)}</p>
                <button className="details-review-content-button" onClick={props.handleDelete}><BsFillTrashFill /></button>
            </div>
            
            <div className="details-reviews-content-reply">
                    
                {props.rating && <p>{props.rating} stars</p>}
                <button onClick={props.handleIndividualReply}>Reply</button>
                {/* {console.log(x._id)} */}
                {console.log(props.showReply)}
                {props.showReply ? <HandleReply/> : null}
                
            </div>
        </div>
    )
}


export default ReviewBox