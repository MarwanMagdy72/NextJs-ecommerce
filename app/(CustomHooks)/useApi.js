"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useApi(endPoint) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/${endPoint}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
  
    };
  }, [endPoint]);

  return { data, isLoading, error };
}
