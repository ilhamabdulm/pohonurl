module.exports = (err, _req, res, _next) => {
  let code = 500;
  let errMsg = [];

  if (err.code) {
    code = err.code;
    errMsg.push(err.message);
  } else {
    if (err.name === 'JsonWebTokenError') {
      code = 401;
      errMsg.push('You are not authorized, missing access token');
    } else {
      errMsg.push(err.errors);
    }
  }

  res.status(code).json({
    code,
    success: false,
    errors: errMsg,
  });
};
