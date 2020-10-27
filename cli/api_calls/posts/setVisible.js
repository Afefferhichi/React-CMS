module.exports = [
  CallServer => arguments => {
    const visibleMethod = arguments[1] === 'true' ? 'visible' : 'invisible';
    return CallServer.put('admin/posts/' + arguments[0] + '/' + visibleMethod);
  },
  result => result
]