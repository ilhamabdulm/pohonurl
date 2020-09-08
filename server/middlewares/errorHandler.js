module.exports = (err, _req, res, _next) => {
  let code = 500;
  let errMsg = [];

  if (err.code && err.name !== 'MongoError') {
    code = err.code;
    errMsg.push(err.message);
  } else {
    if (err.name === 'JsonWebTokenError') {
      code = 401;
      errMsg.push('You are not authorized, missing access token');
    } else if (err.name === 'MongoError') {
      if (err.keyPattern.email) {
        code = 400;
        errMsg.push('Email sudah terdaftar');
      }
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
