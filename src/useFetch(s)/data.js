import { useState, useEffect } from "react";
import API_URL from "../helper/urlConfig";

const lala = () => {
  return "lol";
};

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
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
      .then((data) => {
        setData(data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setError(err.message);
        }
      });

    return () => abortConst.abort();
  }, [url]);

  return { data, error, setData, isLoading };
};

export default useFetch;
