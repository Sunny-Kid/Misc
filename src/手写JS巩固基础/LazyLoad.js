// 懒加载
function lazyLoad() {
  const imgs = document.getElementsByTagName('image');
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight = clientHeight + scrollTop;
  for (let i = 0; i < imgs.length; i++) {
    const offsetTop = imgs[i].offsetTop;
    if (offsetTop < scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}
// 可以增加节流
window.addEventListener('scroll', lazyLoad);

// 滚动到底部
window.addEventListener('scroll', function() {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  if (clientHeight + scrollTop >= scrollHeight) {
    // do something
  }
});
