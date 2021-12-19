import { RequestObject, ResponseObject } from "../../types/types";

const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

// GET
router.route('/').get(async (req: RequestObject, res: ResponseObject) => {
  const boardId = req.baseUrl.split("/").slice(2,3).join("");

  try {
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (err) {
    res.status(404).send({
      status: 404
    })
  }
});

router.route('/:taskId').get(async (req: RequestObject, res: ResponseObject) => {
  const { taskId } = await req.params;
  try {
    const task = await tasksService.get(taskId);
    res.json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send({
      status: 404
    })
  }
});

// POST
router.route('/').post(async (req: RequestObject, res: ResponseObject) => {
  const { body } = req;
  const boardId = req.baseUrl.split("/").slice(2,3).join("");
  const addedTask = new Task({...body, boardId});
  tasksService.add(addedTask);
  res.status(201).json(Task.toResponse(addedTask));
});

// PUT
router.route('/:taskId').put(async (req: RequestObject, res: ResponseObject) => {
  const { taskId } = await req.params;
  const { body } = req;
  await tasksService.put(taskId, body);
  res.status(200).json(Task.toResponse(body));
});

// DELETE
router.route('/:taskId').delete(async (req: RequestObject, res: ResponseObject) => {
  const { taskId } = await req.params;
  try {
    const deletingResult = await tasksService.remove(taskId);
    res.json(Task.toResponse(deletingResult));
  } catch (error) {
    res.status(404).send({
      status: 404,
      error
    })
  }
});

module.exports = router;