import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import useFetch from './useFetch(s)/data';
import { ImLocation } from "react-icons/im";
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiFillStar, AiFillMessage } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import './Details.css';
import useReviewFetch from "./useFetch(s)/fetchReviews";
import ReviewBox from "./ReviewBox";

import ReactStars from "react-rating-stars-component";

const ToiletDetails = () => {

    const { _id } = useParams()
    const { review, reviewErr, setReview } = useReviewFetch(`/api/reviews/toilet?toiletID=${_id}`)
    review.sort((a, b) => new Date(b.date) - new Date(a.date))
    const { data, error } = useFetch('/api/toilets/' + _id)
    const [showBtn, setShowBtn] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [replyID, setReplyID] = useState('')

    const [replyText, setReplyText] = useState('')
    const [showReply, setShowReply] = useState(false)

    const[text, setText] = useState('')


    // display button when clicked
    const showButton = () => {
        setShowBtn(true)
    }

    // clear away text in textarea
    const clearText = (e) => {
        e.preventDefault();
        setReviewText('')
        setShowBtn(false);
        setRating(0)
    }

    // submit button
    const SubmitBtn = () => (
        <div className="submit-button">
            <ReactStars
                count={5}
                onChange={newRating => setRating(newRating)}
                isHalf={true}
                size={28}
                activeColor="#ffd700"
            />
            {rating}
            <div className="submit-button-buttons">
            <button disabled={rating == 0} className={reviewText.length && rating > 0 ? "gotText" : "noText"}>Submit</button>
            <button className="submit-button-clear" onClick={clearText}>Cancel</button>
            </div>
        </div>
    )

    // handling post request
    const handleSubmit = (e) => {
        e.preventDefault();
        const critique = { reviewText, rating, toiletID: _id, date: new Date() };
        console.log(rating)
        fetch('/api/reviews/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(critique)
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res.newRating);
            setReview([...review, res.newReview])
            setReviewText('')
            setRating(0)
            setShowBtn(false);
        })
    }
    // delete button for reviews
    // pass extra data in .map using arrow functions
    const handleDelete = x => e => {
        e.preventDefault();

        fetch('/api/reviews/' + x._id, {
            method: 'DELETE'
        }).then(() => {
            setReview(oldReviews => oldReviews.filter(review => review._id !== x._id))
        })
    }

    // function renderReview(x, showReply){
    //     {console.log(showReply)}
    //     if (showReply){
    //         return    <ReviewBox
    //                     _id={x._id}
    //                     rating={x.rating}
    //                     date = {x.date}
    //                     reviewText = {x.reviewText}
    //                     showReply = {showReply}
    //                     // isReply={true}
    //                     handleIndividualReply={handleIndividualReply(x)}
    //                     handleDelete={handleDelete(x)}
    //         />
    //     }

    //     else {
    //         return    <ReviewBox
    //                     _id={x._id}
    //                     rating={x.rating}
    //                     date = {x.date}
    //                     reviewText = {x.reviewText}
    //                     isReply={false}
    //                     handleIndividualReply={handleIndividualReply(x)}
    //                     handleDelete={handleDelete(x)}
    //         />

    //     }
        
    // }

    const handleIndividualReply = x => {
        {console.log("yo")}
        setShowReply(true)
        console.log(x._id)
        setReplyID(x._id)
        // renderReview(x,true) 
    }
    // {console.log(clickId)}

    const HandleReply = ({id}) => {
        if(id == replyID){
            return(
                <div>
                <form>
                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Your reply" required></textarea>
                    {console.log("this " + id)}
                    {console.log(replyText)}
                    <div className="reply-btn">
                        {/* className={props.replyText.length > 0 ? "gotText" : "noText"} */}
                        <button >Submit</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
            )
        }
        return null
    }
    

    return (
        <div className="details">
            {error && <div>{error}</div>}
            {data && (
                <div className='detailsContent'>

                    <div className="detailsImg">
                        <img src={data.image_url} alt="" />
                    </div>

                    <div className="detailsInfo">

                        <div className="detailsInfo-inside">
                            <h2>{data.name}</h2>

                            <p style={{ float: "left" }}><AiFillStar style={{ color: '#aeaeae' }} /> {data.rating} stars</p><br />

                            <div className="detailsInfo-inside-bidet">
                                {data.hasBidet === true && <div><p><IoIosCheckmarkCircleOutline style={{ color: 'green' }} /> Bidet Friendly</p></div>}

                                {data.hasBidet === false && <div><IoIosCloseCircleOutline style={{ color: 'red' }} /> No Bidet</div>}
                            </div>

                            <Link style={{ textDecoration: 'none', color: '#aeaeae' }} to={'/map'}><button><ImLocation style={{ color: '#aeaeae' }} /> {data.location}</button></Link>
                        </div>


                    </div>

                </div>
            )}
            <div className="details-input">

                <form onSubmit={handleSubmit}>
                    <label>THE <span>CRITIQUE</span></label>
                    <textarea required value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Your critique" onClick={showButton}></textarea>

                    {showBtn ? <SubmitBtn /> : null}
                </form>

                <div className="details-reviews">
                    {reviewErr && <div>{reviewErr}</div>}
                    {/* {console.log(review[0])} */}
                    {review.map((x) => {
                        // if (x._id === replyID){
                            // return renderReview(x,true)
                            return (
                                <div className="details-review-content" key={x._id}>
                                    <div className="details-review-all-content">
                                        <p className="details-review-content-input"><span><AiFillMessage /></span>{x.reviewText}</p>
                                        <p className="details-review-content-inputDate">{x.date.slice(0, 10)}</p>
                                        <button className="details-review-content-button" onClick={handleDelete}><BsFillTrashFill /></button>
                                    </div>
                                    
                                    <div className="details-reviews-content-reply">
                                            
                                        {x.rating && <p>{x.rating} stars</p>}
                                        <button onClick={() => handleIndividualReply(x)}>Reply</button>
                                        {/* {console.log(x._id)} */}
                                        {/* {console.log(showReply)} */}
                                        {showReply ? <HandleReply id={x._id}/> : null}
                                        
                                    </div>

                                    {/* testing textarea */}
                                    <form action="">
                                        <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="hello"></textarea>
                                    </form>
                                </div>
                            )
                        // }
                        // else {
                        //     return renderReview(x,false)
                        // }
                       
                    })} 

                    
                </div>
            </div>

        </div>
    );
}

export default ToiletDetails;