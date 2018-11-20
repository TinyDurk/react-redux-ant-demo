function get(name) {
  const expr = new RegExp(`(^| )${name}=([^;]*)(;|\x24)`);
  const result = expr.exec(document.cookie);
  if (result) {
    return result[2] || null;
  }
  return null;
}

function set(name, value, opts) {
  const options = opts || {};
  let { expires } = options;
  if (typeof options.expires === 'number') {
    expires = new Date();
    expires.setTime(expires.getTime() + options.expires);
  }
  /* eslint-disable prefer-template, max-len */
  const cookie = name + '=' + value + ('; path=' + (options.path ? options.path : '/')) + (options.domain ? '; domain=' + options.domain : '') + (expires ? '; expires=' + expires.toGMTString() : '') + (options.secure ? '; secure' : '');
  document.cookie = cookie;
  return cookie;
}

function remove(name, opts) {
  const options = opts || {};
  options.expires = new Date(0);
  set(name, '', options);
}

const cookie = {
  get,
  set,
  remove,
};

export default cookie;
