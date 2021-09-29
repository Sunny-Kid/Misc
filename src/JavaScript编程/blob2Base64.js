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
  // 将base64解码
  const byteString = atob(base64);
  // 通过arrayBuffer开辟一片连续内存, 不能直接操作
  const bytesCode = new ArrayBuffer(byteString.length);
  // 选择Uint8作为读写视图, 通过操作Uint8Array的下标反映为操作内存
  const byteArray = new Uint8Array(bytesCode);
  // 将实际的Uint8Array中的每一位换成实际字符串每个字符所对应的unicode编码
  for (var i = 0; i < byteArray.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // 生成Blob对象（文件对象）
  return new Blob([...byteArray]);
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      resolve(reader.result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
}

function base64ToBlob(base64) {
  const byteString = atob(base64);
  const bytesCode = new ArrayBuffer(byteString.length * 2);
  const byteArray = new Uint32Array(bytesCode);
  for (var i = 0; i < byteArray.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([...byteArray]);
}
