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
      function remove() {
        console.log("removed");
      }
      document.addEventListener("keydown", handle);
      document.addEventListener("keyup", remove);
      return () => {
        document.removeEventListener("keydown", handle);
        document.removeEventListener("keyup", remove);
    }
    }, [key]);
  }