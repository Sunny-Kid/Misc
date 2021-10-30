const myInstance = (obj, func) => {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  if (proto === null) return false;
  if (proto === func.prototype) return true;
  return myInstance(proto, func);
};

export default myInstance;
