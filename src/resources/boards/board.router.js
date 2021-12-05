const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

// GET
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = await req.params;
  try {
    const board = await boardsService.get(boardId);
    res.json(Board.toResponse(board));
  } catch (err) {
    res.status(404).send({
      status: 404
    })
  }
});

// POST
router.route('/').post(async (req, res) => {
  const { body } = req;
  const addedBoard = new Board({...body});
  boardsService.add(addedBoard);
  res.status(201).json(Board.toResponse(addedBoard));
});

// PUT
router.route('/:boardId').put(async (req, res) => {
  const { boardId } = await req.params;
  const { body } = req;
  await boardsService.put(boardId, body);
  res.status(200).json(Board.toResponse(body));
});

// DELETE
router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = await req.params;
  try {
    const deletingResult = await boardsService.remove(boardId);
    res.json(Board.toResponse(deletingResult));
  } catch (error) {
    res.status(404).send({
      status: 404
    })
  }
});

module.exports = router;
