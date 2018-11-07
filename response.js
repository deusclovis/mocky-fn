exports.status = {
  SUCCESS: { code: 200, description: 'Success' },
  BAD_REQUEST: { code: 400, description: 'Bad request' },
  NOT_FOUND: { code: 404, description: 'Resource not found' },
  INTERNAL_SERVER_ERROR: { code: 500, description: 'Internal server error' },
  CUSTOM_ERROR: { code: 527, description: 'Custom error' }
}

exports.success = (callback, status, data = {}) => {
  callback(null, { status, data });
}

exports.error = (callback, status, data = {}) => {
  callback(JSON.stringify({ status, data }));
}