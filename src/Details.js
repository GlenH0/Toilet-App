import { useHistory, useParams } from "react-router";
import useFetch from './useFetch(s)/data';
import { ImLocation } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { useState } from "react";
import './Details.css';
import useReviewFetch from "./useFetch(s)/fetchReviews";
import { BsFillTrashFill } from "react-icons/bs";

const ToiletDetails = () => {

    const { review, reviewErr, setReview } = useReviewFetch('/api/reviews/')
    review.sort((a, b) => new Date(b.date) - new Date(a.date))

    const { _id } = useParams()
    const { data, error } = useFetch('/api/toilets/' + _id)
    const [showBtn, setShowBtn] = useState(false)
    const [reviewText, setReviewText] = useState('')

    // display button when clicked
    const showButton = () => {
        setShowBtn(true)
    }

    // clear away text in textarea
    const clearText = (e) => {
        e.preventDefault();
        setReviewText('')
        setShowBtn(false);
    }

    // submit button
    const SubmitBtn = () => (
        <div className="submit-button">
            <button disabled={!reviewText} className={reviewText.length > 0 ? "gotText" : "noText"}>Submit</button>
            <button className="submit-button-clear" onClick={clearText}>Cancel</button>
        </div>
    )

    // handling post request
    const handleSubmit = (e) => {
        e.preventDefault();

        const critique = { reviewText, toiletID: _id, date: new Date() };
        fetch('/api/reviews/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(critique)
<<<<<<< HEAD
        }).then((res) => {
            return res.json()
        }).then((newReview) => {
            setReview(oldReviews => [...oldReviews,newReview])
=======
        }).then(() => {
            setReviewText('');
            setShowBtn(false);
>>>>>>> c3b120fb3b6eb0862be6e921575d15d438340699
        })
    }
    // delete button for reviews
    // pass extra data in .map using arrow functions
    const handleDelete = x => e => {
        e.preventDefault();

        fetch('/api/reviews/' + x._id, {
            method: 'DELETE'
        }).then(() => {
        })
    }

    return (
        <div className="details">
            {error && <div>{error}</div>}
            {data && (
                <div className='detailsContent'>

                    <div className="detailsImg">
                        <img src={data.image_url} alt="" />
                    </div>

                    <div className="hr"><hr /></div>

                    <div className="detailsInfo">
                        <h2>{data.name}</h2>
                        <p><ImLocation /> {data.location}</p>
                        {data.hasBidet === true && <div><IoIosCheckmarkCircleOutline style={{ color: 'green' }} />Bidet Friendly</div>}
                        {data.hasBidet === false && <div><IoIosCloseCircleOutline style={{ color: 'red' }} />No Bidget</div>}
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
                    {review.map((x) => {
                        if (x.toiletID === _id) {
                            return (
                                <div className="details-review-content" key={x._id}>
                                    <p className="details-review-content-input"><span><AiFillMessage /></span>{x.reviewText}</p>
                                    <p className="details-review-content-inputDate">{x.date.slice(0, 10)}</p>
                                    <button className="details-review-content-button" onClick={handleDelete(x)}><BsFillTrashFill/></button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

        </div>
    );
}

export default ToiletDetails;