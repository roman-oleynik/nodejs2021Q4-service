import { RequestObject, ResponseObject } from "../../types/types";

const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const Logger = require("../../loggers/logger");
const {validate} = require('uuid');
const onFinished = require('on-finished');
const bodyParser = require("body-parser");
const { isTaskValid } = require("../../validators/validator");

router.use(function (req: RequestObject, res: ResponseObject, next: Function) {
  next();
  const logger = new Logger(req, res);
  logger.logURL();
  logger.logLoggingLevel();
  logger.logParams();
  logger.logBody();

  onFinished(res, function (err: Error, res: ResponseObject) {
    logger.logStatus(res);
  });
})

// GET
router.route('/').get(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const boardId = req.baseUrl.split("/").slice(2,3).join("");
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks.map(Task.toResponse));
  next();
});

router.route('/:taskId').get(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { taskId } = await req.params;
  const task = await tasksService.get(taskId);
  if (!validate(taskId)) {
    res.status(400).send("Task's id is invalid");
    next(new Error("Task's id is invalid"));
  } else if (validate(taskId) && !task) {
    res.status(404).send("Task is not found");
    next(new Error("Task is not found"));
  } else {
    const task = await tasksService.get(taskId);
    res.status(200).json(Task.toResponse(task));
    next();
  }
});

// POST
router.route('/').post(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { body } = req;
  const boardId = req.baseUrl.split("/").slice(2,3).join("");
  const addedTask = new Task({...body, boardId});

  if (!isTaskValid(addedTask)) {
    res.status(400).send("Board is invalid");
    next(new Error("Board is invalid"));
  } else {
    tasksService.add(addedTask);
    res.status(201).json(Task.toResponse(addedTask));
    next();
  }
});

// PUT
router.route('/:taskId').put(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { taskId } = await req.params;
  const { body } = req;
  const task = tasksService.get(taskId);
  if (!validate(taskId)) {
    res.status(400).send("UsBoarder's id is invalid");
    next(new Error("Board's id is invalid"));
  } else if (task && !isTaskValid(body)) {
    res.status(400).send("Board's body is invalid");
    next(new Error("Board's body is invalid"));
  } else if (!task) {
    res.status(404).send("Board isn't found");
    next(new Error("Board isn't found"));
  } else {
    await tasksService.put(taskId, body);
    res.status(200).json(Task.toResponse(body));
    next();
  }
});

// DELETE
router.route('/:taskId').delete(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { taskId } = await req.params;
  const task = tasksService.get(taskId);
  if (!validate(taskId)) {
    res.status(400).send("User's id is invalid");
    next(new Error("User's id is invalid"));
  } else if (!task) {
    res.status(404).send("User isn't found");
    next(new Error("User isn't found"));
  } else {
    await tasksService.remove(taskId);
    res.status(204).json(Task.toResponse({}));
    next();
  }
});

module.exports = router;
