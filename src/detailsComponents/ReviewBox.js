import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import {useState} from 'react'





const ReviewBox = (props) => {
  const [showReplies,setShowReplies] = useState(false)
  const [btnText, setBtnText] = useState('Show Replies')
  const btnShowReplies = () => {
    setShowReplies(!showReplies)
    if(btnText === 'Show Replies'){
      setBtnText('Hide')
    }else{setBtnText('Show Replies')}
  }
  return (
    <div className="details-review-content">

      <div className="details-review-all-content">
        <p className="details-review-content-input">
          <span>
            <AiFillMessage />
          </span>
          {props.reviewText}
        </p>
        <p className="details-review-content-inputDate">
          {props.date.slice(0, 10)}
        </p>
        {/* disable delete button */}
        {/* <button
          className="details-review-content-button"
          onClick={props.handleDelete}
        >
          <BsFillTrashFill />
        </button> */}
      </div>
      
      <div className="details-reviews-content-reply">
      {props.rating && <p>{props.rating} stars</p>}
     
      
        <button className="details-reviews-content-replyBtn" onClick={props.handleIndividualReply}>REPLY</button>
         
        {/* {console.log(x._id)} */}
        {props.isReply && props.children}
        
        {/* {console.log(props.replies.props.replies)} */}
        {/* display button if there are replies only */}
        { props.replies.props.replies != undefined ? <button className="details-reviews-content-showreplyBtn" onClick={btnShowReplies}>{btnText}</button> : null}
        {showReplies && props.replies}
      </div>
    </div>
  );
};

export default ReviewBox;
