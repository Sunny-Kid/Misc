Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error();
  }

  const self = this;
  const args = [].slice.call(arguments, 1);

  function fNOP() {}
  function fBound() {
    const bindArgs = [].slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
