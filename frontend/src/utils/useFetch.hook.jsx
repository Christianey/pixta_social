import { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const fetchData = async () => {
      try {
        const response = await axios(url, options);
        setResponse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isLoading, url, options]);

  return [{ isLoading, error, response }, doFetch];
};

export default useFetch;
