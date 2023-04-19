function useInterval(fn, wait) {
  const fnRef = useRef();
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fnRef.current();
    }, wait);
    return () => {
      clearInterval(intervalId);
    };
  }, [wait]);
}
