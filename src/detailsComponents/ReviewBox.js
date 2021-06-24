import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";


const ReviewBox = (props) => {
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
        <button
          className="details-review-content-button"
          onClick={props.handleDelete}
        >
          <BsFillTrashFill />
        </button>
      </div>

      
      <div className="details-reviews-content-reply">
      {props.rating && <p>{props.rating} stars</p>}
        <button className="details-reviews-content-replyBtn" onClick={props.handleIndividualReply}>REPLY</button>
        {/* {console.log(x._id)} */}
        {props.isReply && props.children}
      </div>
    </div>
  );
};

export default ReviewBox;
