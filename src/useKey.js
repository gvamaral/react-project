import { useEffect, useRef } from 'react';

export default function useKey(key, callback) {
    const callbackRef = useRef(callback);

    useEffect(() => {
      callbackRef.current = callback;
    });

    useEffect(() => {
      function handle(event) {
        // console.log(event);
        if (event.code === key){
          callbackRef.current(event);
          event.preventDefault();
        }
      }
      document.addEventListener("keydown", handle);
      return () => document.removeEventListener("keydown", handle)
    }, [key]);
  }