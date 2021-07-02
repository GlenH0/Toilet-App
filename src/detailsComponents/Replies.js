
import { AiFillMessage, AiFillStar } from "react-icons/ai";

const Replies = ({replies}) => {
    return <div>
        {replies && 
            replies.map((reply) => (
              <div key={reply._id}>
                <p className='details-review-content-replies'><AiFillMessage size={22}/>
                  <span className="details-review-content-inputDate">
                    {reply.date.slice(0, 10)}
                  </span>
                </p>
                <p className="details-review-content-repliesText">
                  {reply.replyText}</p>
              </div>
            ))}
            </div>
            
}

export default Replies