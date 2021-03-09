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

window.addEventListener('scroll', lazyLoad);
