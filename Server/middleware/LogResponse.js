module.exports = (req, res, next) => {
    const oldSend = res.send;
    res.send = function (data) {
      console.log('Response from server:', data);
      oldSend.apply(res, arguments);
    };
    next();
  };
  