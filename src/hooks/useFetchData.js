import { useState, useEffect } from "react";

const useFetchData = (url, page = 0, limit = 32) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}?limit=${limit}&skip=${page * limit}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.products || result);
        setTotalPages(Math.ceil(result.total / limit));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, page, limit]);

  return { data, loading, error, totalPages };
};

export default useFetchData;