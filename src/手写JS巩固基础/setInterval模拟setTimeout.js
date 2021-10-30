const myTimeout = (fn, timeout) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, timeout);
  return () => clearInterval(timer);
};
