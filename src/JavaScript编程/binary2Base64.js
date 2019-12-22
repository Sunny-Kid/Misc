function binary2Base64(byte) {
  const str = new Uint32Array(byte).reduce((prev, curr) => {
    return prev + String.fromCharCode(curr);
  }, '');
  return btoa(str);
}
