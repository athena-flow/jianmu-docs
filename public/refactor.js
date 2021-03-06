(function () {
  if (window.parent === window || window.urlListenerInterval) {
    return;
  }

  let url;
  // 监听url
  window.urlListenerInterval = window.setInterval(() => {
    if (url && url === window.location.href) {
      return;
    }

    url = window.location.href;
    const message = {
      url,
      title: document.title,
    }
    console.debug('new message: ', message);

    const navBarTitle = document.getElementsByClassName('nav-bar-title')[0];
    if (navBarTitle) {
      navBarTitle.href = 'index.html';
      navBarTitle.innerHTML = ''
    }

    window.parent.postMessage(message, '*');
  }, 500);

  console.debug('Url listener has been initialized.', window.urlListenerInterval);
})();