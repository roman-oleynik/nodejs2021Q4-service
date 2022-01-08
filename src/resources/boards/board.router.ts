import {RequestObject, ResponseObject,NextFunc} from "../../types/types";

const router = require('express').Router();
const {validate} = require('uuid');
const onFinished = require('on-finished');
const Board = require('./board.model');
const boardsService = require('./board.service');
const Logger = require("../../loggers/logger");
const { isBoardValid } = require("../../validators/validator");

router.use((req: RequestObject, res: ResponseObject, next: NextFunc) => {
  next();
  const logger = new Logger(req, res);
  logger.logURL();
  logger.logLoggingLevel();
  logger.logParams();
  logger.logBody();

  onFinished(res, (err: Error, response: ResponseObject) => {
    logger.logStatus(response);
  });
})
// GET
router.route('/').get(async (req: RequestObject, res: ResponseObject, next: NextFunc) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
  next();
});

router.route('/:boardId').get(async (req: RequestObject, res: ResponseObject, next: NextFunc) => {
  const { boardId } = await req.params;
  const board = await boardsService.get(boardId);
  if (!validate(boardId)) {
    res.status(400).send("Board's id is invalid");
    next(new Error("Board's id is invalid"));
  } else if (validate(boardId) && !board) {
    res.status(404).send("Board is not found");
    next(new Error("Board is not found"));
  } else {
    res.status(200).json(Board.toResponse(board));
    next();
  }
});

// POST
router.route('/').post(async (req: RequestObject, res: ResponseObject, next: NextFunc) => {
  const { body } = req;
  const addedBoard = new Board({...body});

  if (!isBoardValid(addedBoard)) {
    res.status(400).send("Board is invalid");
    next(new Error("Board is invalid"));
  } else {
    boardsService.add(addedBoard);
    res.status(201).json(Board.toResponse(addedBoard));
    next();
  }
});

// PUT
router.route('/:boardId').put(async (req: RequestObject, res: ResponseObject, next: NextFunc) => {
  const { boardId } = await req.params;
  const { body } = req;
  const board = boardsService.get(boardId);
  if (!validate(boardId)) {
    res.status(400).send("UsBoarder's id is invalid");
    next(new Error("Board's id is invalid"));
  } else if (board && !isBoardValid(body)) {
    res.status(400).send("Board's body is invalid");
    next(new Error("Board's body is invalid"));
  } else if (!board) {
    res.status(404).send("Board isn't found");
    next(new Error("Board isn't found"));
  } else {
    await boardsService.put(boardId, body);
    res.status(200).json(Board.toResponse(body));
    next();
  }
});

// DELETE
router.route('/:boardId').delete(async (req: RequestObject, res: ResponseObject, next: NextFunc) => {
  const { boardId } = await req.params;
  const board = boardsService.get(boardId);

  if (!validate(boardId)) {
    res.status(400).send("Board's id is invalid");
    next(new Error("Board's id is invalid"));
  } else if (!board) {
    res.status(404).send("Board isn't found");
    next(new Error("Board isn't found"));
  } else {
    await boardsService.remove(boardId);
    res.status(204).json(Board.toResponse({}));
    next();
  }
});

module.exports = router;
