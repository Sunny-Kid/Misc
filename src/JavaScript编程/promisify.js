function promisify(fn) {
  return function(options) {
    const options = options || {};
    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    const { success: optSuccess, fail: optFail } = options;
    options.success = function(res) {
      typeof optSuccess === 'function' && optSuccess(res);
      _resolve(res);
    };
    options.fail = function(reason) {
      typeof optFail === 'function' && optFail(res);
      _reject(reason);
    };
    fn(options);
    return promise;
  };
}
