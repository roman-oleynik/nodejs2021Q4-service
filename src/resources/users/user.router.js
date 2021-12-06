const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');


// GET
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const { userId } = await req.params;
  const user = await usersService.get(userId);
  res.json(User.toResponse(user));
});

// POST
router.route('/').post(async (req, res) => {
  const { body } = req;
  const addedUser = new User({...body});
  usersService.add(addedUser);
  res.status(201).json(User.toResponse(addedUser));
});

// // PUT
router.route('/:userId').put(async (req, res) => {
  const { userId } = await req.params;
  const { body } = req;
  await usersService.put(userId, body);
  res.status(200).json(User.toResponse(body));
});

// // DELETE
router.route('/:userId').delete(async (req, res) => {
  const { userId } = await req.params;
  await usersService.remove(userId);
  res.json(User.toResponse({}));
});

module.exports = router;
