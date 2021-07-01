

const Replies = ({replies}) => {
    return <div>
        {replies && 
            replies.map((reply) => (
              <div key={reply._id}>
                <p>
                  <span className="details-review-content-inputDate">
                    {reply.date.slice(0, 10)}&nbsp;&nbsp;
                  </span>
                  {reply.replyText}
                </p>
              </div>
            ))}
            </div>
            
}

export default Replies