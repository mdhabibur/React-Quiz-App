import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    requestFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //[url,method,headers] dependency dile , browser continuously loop e pore jai.karon url, method change na holer, header er object is a reference type data so whenever the useFetch() and useEffect()
  //is being called, everytime new header object is being passed. that why the browser is in continous loop

  return {
    loading,
    error,
    result,
  };
}