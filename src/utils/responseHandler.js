function errorHandler(error = "Something went wrong", status = 500) {
  return {
    status,
    response: {
      success: false,
      message: error,
    },
  };
}

function successHandler(res, data = [], status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}

module.exports = {
  errorHandler,
  successHandler,
};
