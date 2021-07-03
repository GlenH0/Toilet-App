import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { useState } from 'react'
import ReactStars from "react-rating-stars-component";

const ReviewBox = (props) => {
  const [showReplies, setShowReplies] = useState(false)
  const [btnText, setBtnText] = useState('Show Replies ⌄')

  const btnShowReplies = () => {
      setShowReplies(!showReplies)
      if (btnText === 'Show Replies ⌄') {
        setBtnText('Hide ⌃')
      } else { setBtnText('Show Replies ⌄') }
    }

  return (
    <div className="details-review-content">

      <div className="details-review-all-content">
        <p><AiFillMessage size={30}/> <span className="details-review-content-inputDate">{props.date.slice(0, 10)}</span> {props.rating && <ReactStars
          value={props.rating}
          edit={false}
          size={16}
          activeColor="#ffb260"
          isHalf={true}
        />}</p>
        <p className="details-review-content-input">
          {props.reviewText}
          
        </p>
      </div>

      <div className="details-reviews-content-reply">

        <button className="details-reviews-content-replyBtn" onClick={props.handleIndividualReply}>REPLY</button>

        {/* {console.log(x._id)} */}
        {props.isReply && props.children}

        {/* {console.log(props.replies.props.replies)} */}
        {/* display button if there are replies only */}
        {props.replies.props.replies != undefined ? <button className="details-reviews-content-showreplyBtn" onClick={btnShowReplies}>{btnText}</button> : null}
        {showReplies && props.replies}
        {/* {console.log(Object.keys(props.replies.props.replies).length)} */}
      </div>
    </div>
  );
};

export default ReviewBox;
