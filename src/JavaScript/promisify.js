function promisify(fn) {
  return function(options) {
    const options = options || {};
    const promise = new Promise((resolve, reject) => {
      const { success: optSuccess, fail: optFail } = options;
      options.success = function success(res) {
        typeof optSuccess === 'function' && optSuccess(res);
        resolve(res);
      };
      options.fail = function success(res) {
        typeof optFail === 'function' && optFail(res);
        reject(res);
      };
    }).finally(() => {
      fn(options);
    });
    return promise;
  };
}
