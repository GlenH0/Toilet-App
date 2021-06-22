import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import useFetch from './useFetch(s)/data';
import { ImLocation } from "react-icons/im";
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { useState,useRef,useEffect } from "react";
import './Details.css';
import useReviewFetch from "./useFetch(s)/fetchReviews";
import useReviewPaginationFetch from "./useFetch(s)/fetchReviewPagination";
import { BsFillTrashFill } from "react-icons/bs";
import ReviewBox from "./Mapbox/ReviewBox";
import ReactPaginate from "react-paginate";
import Pagination from '@material-ui/lab/Pagination';

import ReactStars from "react-rating-stars-component";

const ToiletDetails = () => {
    
    const { _id } = useParams()
    // show 5 reviews per page
    const [offset, setOffset] = useState(0)
    //const { review, reviewErr, setReview,numPages,isLoading } = useReviewPaginationFetch(`/api/reviews/toilet?toiletID=${_id}`,offset,5)
    const numPages = useRef(null) 
    console.log('running');
    const { review, reviewErr, setReview,isLoading } = useReviewFetch(`/api/reviews/toilet?toiletID=${_id}`)
    const { data, error } = useFetch('/api/toilets/' + _id)
    const [showBtn, setShowBtn] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [replyID, setReplyID] = useState('')
    const [replyText,setReplyText] = useState('')
    const [page, setPage] = useState(0);
   
    

    useEffect(() => {
        console.log('tee hee irun');
        numPages.current = Math.ceil(review.length/5)
    }, [review])
     
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

    //handling post request
    const handleReviewSubmit = (e) => {
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
            setReview([res.newReview,...review])
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

    // handling reply
    const HandleReply = () => (
        <div>
            <form>
                <textarea required placeholder="Your reply"></textarea>
            </form>
        </div>
        
    )

    const handleReplySubmit = id => e => {
        console.log(id);

    }

    function renderReview(x,isReply){
        
        if (isReply){
            return    <ReviewBox
                        key={x._id}
                        _id={x._id}
                        rating={x.rating}
                        date = {x.date}
                        isReply={true}
                        reviewText={x.reviewText}
                        handleIndividualReply={handleIndividualReply(x)}
                        handleDelete={handleDelete(x)}
                        handleReplyText={(e) => setReplyText(e.target.value)}
                        replyText = {replyText}
                        handleReplySubmit={handleReplySubmit}
            />
        }

        else {
            return    <ReviewBox
                        key={x._id}
                        _id={x._id}
                        rating={x.rating}
                        reviewText={x.reviewText}
                        date = {x.date}
                        isReply={false}
                        handleIndividualReply={handleIndividualReply(x)}
                        handleDelete={handleDelete(x)}
                        
            />

        }
        
    }

    const handleIndividualReply = x => e => {

        setReplyID(x._id)
        renderReview(x,true)
    }

    const handlePageClick = (e,page) => {
        //will update the offset to send over new offset to calculate what data to return over
        setPage(page)
        setOffset((page-1)*5)
    }

    function sortReviewByDate(reviews){
        return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
    }
    
    const sortedReviews = sortReviewByDate(review)
    const mappedReview = sortedReviews.slice(offset,5+offset).map(x => {
        if (x._id === replyID){
            return (renderReview(x,true))
        }
        else {
            return (renderReview(x,false))
        }
    })

    

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

                <form onSubmit={handleReviewSubmit}>
                    <label>THE <span>CRITIQUE</span></label>
                    <textarea required value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Your critique" onClick={showButton}></textarea>
                    {showBtn && <SubmitBtn />}
                </form>

                <div className="details-reviews">
                    {reviewErr && <div>{reviewErr}</div>}
                    {!isLoading && mappedReview} 
                </div>
               
            </div>
            <div  id="react-paginate">
                <Pagination
                    count={numPages.current}
                    onChange={handlePageClick}
                    page={page}


                />
            </div> 
        </div>
    );
}

export default ToiletDetails;