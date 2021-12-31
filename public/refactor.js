(function () {
  if (window.parent === window) {
    return;
  }

  let url;
  // 监听url
  window.setInterval(() => {
    if (url && url === window.location.href) {
      return;
    }

    url = window.location.href;
    console.debug('new url: ', url);

    window.parent.postMessage(url, '*');
  }, 500);
})();