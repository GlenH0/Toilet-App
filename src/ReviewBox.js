import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
const ReplySubmitButton = (props) => (
  <div className="submit-button">
    <div className="submit-button-buttons">
      <button className={props.replyText.length ? "gotText" : "noText"}>
        Submit
      </button>
      <button className="submit-button-clear" onClick={props.handleReplyCancel}>Cancel</button>
    </div>
  </div>
);


const Reply = (props) => (
  <div>
    <form onSubmit={props.handleReplySubmit}>
      <textarea
        required
        value={props.replyText}
        onChange={props.handleReplyText}
        placeholder="Your reply"
      ></textarea>
      <ReplySubmitButton replyText={props.replyText} handleReplyCancel={props.handleReplyCancel} />
    </form>
  </div>
);

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
        {props.isReply && (
          <Reply
            replyText={props.replyText}
            handleReplyText={props.handleReplyText}
            handleReplySubmit={props.handleReplySubmit(props._id)}
            handleReplyCancel={props.handleReplyCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewBox;
