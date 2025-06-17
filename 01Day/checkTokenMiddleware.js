// middleware for password and token checking
let checkToken = (req, res, next) => {
  if (req.query.token == "" || req.query.token == undefined) {
    return res.send({
      status: 404,
      msg: "plz provide the token",
    });
  }
  if (req.query.token != process.env.myToken) {
    return res.send({
      status: 404,
      msg: "plz provide the correct token",
    });
  }
  next();
};

// middle ware for password checking
let checkPassword = (req, res, next) => {
  if (req.query.password == "" || req.query.password == undefined) {
    return res.send({
      status: 404,
      msg: "plz provide the password",
    });
  }
  if (req.query.password !== process.env.myPassword) {
    return res.send({
      status: 404,
      msg: "plz provide the correct password",
    });
  }
  next();
};

module.exports = { checkToken, checkPassword };
