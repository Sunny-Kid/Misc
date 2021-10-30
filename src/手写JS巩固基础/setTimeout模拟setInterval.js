const myInterval = (fn, timeout) => {
  let timer = null;
  const interval = () => {
    timer = setTimeout(() => {
      fn();
      interval();
    }, timeout);
  };
  interval();
  return () => clearTimeout(timer);
};
