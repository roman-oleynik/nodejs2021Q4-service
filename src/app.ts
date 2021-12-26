import {RequestObject, ResponseObject} from "./types/types";

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { LOGGING_LEVEL } = require('./common/config');
var fs = require('fs');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
type LoggingLevel = "0" | "1" | "2" | "3" | "4";

const Logger = require("./loggers/logger");
const loggerInstance = new Logger();
const onFinished = require('on-finished');
const bodyParser = require("body-parser");

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

app.use(function (error: Error, req: RequestObject, res: ResponseObject, next: Function) {
  next();
  onFinished(res, function (err: Error, res: ResponseObject) {
    const loggerInstance = new Logger(req, res);
    const level: LoggingLevel = LOGGING_LEVEL as LoggingLevel;
    loggerInstance.logError(error.message);
    errorsWriteStream.write(`
      Logging level: ${level}
      Error: ${error.message}
      URL: ${JSON.stringify(req.originalUrl)}
      Response status: ${JSON.stringify(res.statusCode)}
      \n
    `);
  })
});

loggerInstance.handleUncaughtExceptions();
loggerInstance.handleUnhandledRejections();

// For x-check purposes
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
