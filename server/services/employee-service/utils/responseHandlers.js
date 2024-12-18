// /utils/responseHandlers.js

const successResponse = (data, message = 'Success') => {
    return {
      status: 'success',
      message,
      data,
    };
  };
  
  const errorResponse = (message = 'An error occurred', code = 500) => {
    return {
      status: 'error',
      message,
      code,
    };
  };
  
  module.exports = { successResponse, errorResponse };
  