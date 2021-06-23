import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";


const ReviewBox = (props) => {
  return (
    <div className="details-review-content">
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
      {props.rating && <p>{props.rating} stars</p>}

      <div className="details-reviews-content-reply">
        <button onClick={props.handleIndividualReply}>Reply {props._id}</button>
        {/* {console.log(x._id)} */}
        {props.isReply && props.children}
      </div>
    </div>
  );
};

export default ReviewBox;
