import {RequestObject, ResponseObject, NextFunc} from "./types/types";

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const fs = require('fs');
const onFinished = require('on-finished');
const bodyParser = require("body-parser");
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { LOGGING_LEVEL } = require('./common/config');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
type LoggingLevel = "0" | "1" | "2" | "3" | "4";

const Logger = require("./loggers/logger");

const logger = new Logger();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use('/', (req: RequestObject, res: ResponseObject, next: () => void) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

const errorsWriteStream = fs.createWriteStream("./errors.txt");

app.use((error: Error, req: RequestObject, res: ResponseObject, next: NextFunc) => {
  next();
  onFinished(res, (err: Error, response: ResponseObject) => {
    const loggerInstance = new Logger(req, response);
    const level: LoggingLevel = LOGGING_LEVEL as LoggingLevel;
    loggerInstance.logError(error.message);
    errorsWriteStream.write(`
      Logging level: ${level}
      Error: ${error.message}
      URL: ${JSON.stringify(req.originalUrl)}
      Response status: ${JSON.stringify(response.statusCode)}
      \n
    `);
  })
});

logger.handleUncaughtExceptions();
logger.handleUnhandledRejections();

// For x-check purposes
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
