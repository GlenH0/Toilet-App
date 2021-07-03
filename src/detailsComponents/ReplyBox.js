




const ReplySubmitButton = ({replyText,handleReplyCancel}) => (
    <div className="submit-button">
      <div className="submit-button-buttons">
        <button className={replyText.length ? "gotText" : "noText"}>
          Submit
        </button>
        <button className="submit-button-clear" onClick={handleReplyCancel}>Cancel</button>
      </div>
    </div>
  );


const ReplyBox = ({replyText,handleReplyCancel,handleReplySubmit,handleReplyText}) => (
    <div>
    <form onSubmit={handleReplySubmit}>
      <textarea
        required
        value={replyText}
        onChange={handleReplyText}
        placeholder=" Your reply"
      ></textarea>
      <ReplySubmitButton replyText={replyText} handleReplyCancel={handleReplyCancel} />
    </form>
  </div>
)


export default ReplyBox 