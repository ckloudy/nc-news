import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
  const [ data, setData ] = useState([]);

  useEffect(
    () => {
      fetch(endpoint)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        });
    },
    [ endpoint ]
  );

  return { data };
};

export default useFetch;
