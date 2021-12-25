import {RequestObject, ResponseObject} from "./types/types";

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));


const Logger = require("./loggers/logger");
const loggerInstance = new Logger();
const onFinished = require('on-finished');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use('/', (req: RequestObject, res: ResponseObject, next: () => void) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(function (err: Error, req: RequestObject, res: ResponseObject, next: Function) {
  console.error(err.message);
  next();
  // onFinished(res, function (err: Error, res: ResponseObject) {
  //   console.error(req.originalUrl);
  //   console.error(res.statusCode);
  // })
});

loggerInstance.handleUncaughtExceptions();
loggerInstance.handleUnhandledRejections();

// For x-check purposes
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
