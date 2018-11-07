const config = {
  local: {
    expedia: {
      url: 'https://test.ean.com/2.1',
      api_key: '4029cdoi17j0rqu7i1j5qd2l1i',
      secret: '3v3sjhr6u302h',
      user_agent: 'RTMP/1.0.0'
    }
  },
  development: {
    expedia: {
      url: 'https://test.ean.com/2.1',
      api_key: '4029cdoi17j0rqu7i1j5qd2l1i',
      secret: '3v3sjhr6u302h',
      user_agent: 'RTMP/1.0.0'
    }
  },
  production: {
    expedia: {
      url: 'https://api.ean.com/2.1',
      api_key: '4029cdoi17j0rqu7i1j5qd2l1i',
      secret: '3v3sjhr6u302h',
      user_agent: 'RTMP/1.0.0'
    }
  }
}

module.exports = config[process.env.NODE_ENV || 'local'];