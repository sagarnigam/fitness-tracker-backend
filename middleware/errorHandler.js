const { constants } = require("../contants.js");

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;

  switch (status) {
    case constants.VALIDATION_ERROR:
      res.json({
        tittle: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        tittle: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        tittle: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        tittle: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        tittle: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error");
      break;
  }
};

module.exports = errorHandler;
