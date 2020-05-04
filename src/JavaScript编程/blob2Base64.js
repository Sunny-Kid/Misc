function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', e => {
      resolve(e.target.result);
    });
    fileReader.readAsDataURL(blob);
    fileReader.addEventListener('error', err => {
      reject(err);
    });
  });
}

function base64ToBlob(base64) {
  var base64Arr = base64.split(',');
  var imgtype = '';
  var base64String = '';
  if (base64Arr.length > 1) {
    //如果是图片base64，去掉头信息
    base64String = base64Arr[1];
    imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
  // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);

  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  // 生成Blob对象（文件对象）
  return new Blob(byteArray, { type: imgtype });
}

function base64ToBlob(base64) {
  var base64Arr = base64.split(',');
  var imgType = '';
  var base64String = '';
  var bytes = btoa(base64Arr[1]);
  const byteArray = new Uint8Array(new ArrayBuffer(bytes.length));
  for (let i = 0;i < byteArray.length;i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }
  return new Blob(byteArray, { type: imgtype });
}
