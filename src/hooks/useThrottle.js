function useThrottle(fn, ms = 30, deps = []) {
  let flagRef = useRef();
  useEffect(() => {
    if (flagRef.current) return;
    flagRef.current = true;
    setTimeout(() => {
      fn();
      flagRef.current = false;
    }, ms);
  }, [deps]);

  const cancel = () => {
    flagRef.current = false;
  };
  return [cancel];
}

function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRanRef = useRef(Date.now());
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastRanRef >= delay) {
        setThrottledValue(value);
        lastRanRef = Date.now();
      }
    }, delay - (Date.now() - lastRanRef.current));
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [value, delay]);
  return throttledValue;
}
