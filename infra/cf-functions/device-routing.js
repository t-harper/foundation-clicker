function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Let file requests (with extensions) pass through unchanged
  if (/\.[a-z0-9]{1,10}$/i.test(uri)) return request;

  // Check override cookie
  var cookies = request.cookies || {};
  var viewOverride = cookies['fg-view'] ? cookies['fg-view'].value : null;

  var isMobile;
  if (viewOverride === 'desktop') isMobile = false;
  else if (viewOverride === 'mobile') isMobile = true;
  else {
    var ua = (request.headers['user-agent'] || {}).value || '';
    isMobile = /iPhone|iPod|Android.*Mobile|webOS|BlackBerry/i.test(ua);
  }

  request.uri = isMobile ? '/mobile/index.html' : '/index.html';
  return request;
}
