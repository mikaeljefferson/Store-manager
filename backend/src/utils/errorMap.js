const errorMap = {
  INVALID_VALUE: 422,
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  BAD_REQUEST: 400,
  };
  
  const mapError = (type) => errorMap[type] || 500;
  
  module.exports = {
    errorMap,
    mapError,
  };