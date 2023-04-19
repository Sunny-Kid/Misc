function useDebounce(fn, ms = 30, deps = []) {
  let timerId = useRef();
  useEffect(() => {
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      fn();
    }, ms);
  }, [deps]);

  const cancel = () => {
    clearTimeout(timerId.current);
    timerId = null;
  };
  return [cancel];
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
