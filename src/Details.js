import { useParams } from "react-router";
import useFetch from './useFetch(s)/data';
import { ImLocation } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";

import './Details.css';
import useReviewFetch from "./useFetch(s)/fetchReviews";

const ToiletDetails = () => {

    const {review, reviewErr} = useReviewFetch('/api/reviews/')
    review.sort((a,b) => new Date(b.date) - new Date(a.date))
    
    const { _id } = useParams()
    const { toiletData, toiletError } = useFetch('/api/toilets/' + _id)
    console.log(toiletData);
    const [showBtn, setShowBtn] = useState(false)
    const [empty, setEmpty] = useState('')
    const [reviewText, setReviewText] = useState('')
    // const [toiletID, setToiletID] = useState('')
    // const [date, setDate] = useState('')

    const showButton = () => {
        setShowBtn(true)
    }

    const clearText = (e) => {
        e.preventDefault();
        setEmpty('');
        setShowBtn(false)
    }
    const SubmitBtn = () => (
        <div className="submit-button">
            <button className={ reviewText.length > 0 ? "gotText": "noText"}>Submit</button>
            <button className="noText" onClick={clearText}>Cancel</button>
        </div>
    )
    // Will unlock this once backend is setup

    const handleSubmit = (e) => {
        // e.preventDefault();

        const critique = {reviewText, toiletID:_id, date: new Date()};

        fetch('/api/reviews/', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(critique)
        }).then(() => {
            console.log('new review added!')
        })
    }

    return (
        <div className="details">
            {toiletError && <div>{toiletError}</div>}
            {toiletData && (
                <div className='detailsContent'>

                    <div className="detailsImg">
                        <img src={toiletData.image_url} alt="" />
                    </div>

                    <div className="hr"><hr /></div>

                    <div className="detailsInfo">
                        <h2>{toiletData.name}</h2>
                        <p><ImLocation /> {toiletData.location}</p>
                        {toiletData.hasBidet === true && <div><IoIosCheckmarkCircleOutline style={{color:'green'}}/>Bidet Friendly</div>}
                        {toiletData.hasBidet === false && <div><IoIosCloseCircleOutline style={{color:'red'}}/>No Bidget</div>}
                    </div>

                </div>
            )}
            <div className="details-input">
                
                <form onSubmit={handleSubmit}>
                    <label>THE <span>CRITIQUE</span></label>
                    <textarea required  value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Your critique" onClick={showButton}></textarea>
                    {showBtn ? <SubmitBtn /> : null}
                </form> 
            </div>
            <div className="details-reviews">
                {reviewErr && <div>{reviewErr}</div>}
                {review.map((x) => { 
                    if(x.toiletID == _id){
                        return(
                            <div className="details-review-content" key={x._id}>
                                {x.reviewText}
                                
                                <li>{x.date.slice(0,10)}</li>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default ToiletDetails;