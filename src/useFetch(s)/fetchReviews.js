import { useState, useEffect } from "react";
import API_URL from "../helper/urlConfig";

const useReviewFetch = (url) => {
  const [review, setReview] = useState([]);
  const [reviewErr, setReviewError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const abortConst = new AbortController();
    fetch(API_URL + url, { signal: abortConst.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("NOOB");
        }
        return res.json();
      })
      .then((review) => {
        setReview(review);
        setReviewError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("no fetch");
        } else {
          setReviewError(err.message);
        }
      });

    return () => abortConst.abort();
  }, [url]);

  return { review, reviewErr, setReview, isLoading };
};

export default useReviewFetch;
