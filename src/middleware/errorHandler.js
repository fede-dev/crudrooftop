const makeObjError = (err, msg, status) => {
  return {
    message: msg,
    error: err,
    status: status,
  };
};

module.exports = {
  makeObjError,
};
