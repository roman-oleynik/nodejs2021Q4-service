import {RequestObject, ResponseObject} from "../../types/types";


const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const Logger = require("../../loggers/logger");
const {validate} = require('uuid');
const onFinished = require('on-finished');
const { isUserValid } = require("../../validators/validator");

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
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
    next();
});

router.route('/:userId').get(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { userId } = await req.params;
  const user = await usersService.get(userId);
  if (!validate(userId)) {
    res.status(400).send("User's id is invalid");
    next(new Error("User's id is invalid"));
  } else if (validate(userId) && !user) {
    res.status(404).send("User is not found");
    next(new Error("User is not found"));
  } else {
    res.status(200).json(User.toResponse(user));
    next();
  }
});
// POST
router.route('/').post(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { body } = await req;
  const addedUser = new User({...body});

  if (!isUserValid(addedUser)) {
    res.status(400).send("User is invalid");
    next(new Error("User is invalid"));
  } else {
    usersService.add(addedUser);
    res.status(201).json(User.toResponse(addedUser));
    next();
  }
});

// PUT
router.route('/:userId').put(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { userId } = await req.params;
  const { body } = req;
  const user = usersService.get(userId);
  if (!validate(userId)) {
    res.status(400).send("User's id is invalid");
    next(new Error("User's id is invalid"));
  } else if (user && !isUserValid(body)) {
    res.status(400).send("User's body is invalid");
    next(new Error("User's body is invalid"));
  } else if (!user) {
    res.status(404).send("User isn't found");
    next(new Error("User isn't found"));
  } else {
    await usersService.put(userId, body);
    res.status(200).json(User.toResponse(body));
    next();
  }
});

// DELETE
router.route('/:userId').delete(async (req: RequestObject, res: ResponseObject, next: Function) => {
  const { userId } = await req.params;
  const user = usersService.get(userId);

  if (!validate(userId)) {
    res.status(400).send("User's id is invalid");
    next(new Error("User's id is invalid"));
  } else if (!user) {
    res.status(404).send("User isn't found");
    next(new Error("User isn't found"));
  } else {
    await usersService.remove(userId);
    res.status(204).json(User.toResponse({}));
    next();
  }
});


module.exports = router;
