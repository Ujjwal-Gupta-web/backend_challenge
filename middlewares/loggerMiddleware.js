const logger=require("../utility/logger")

const loggerMiddleware=((req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
  });

  module.exports=loggerMiddleware;