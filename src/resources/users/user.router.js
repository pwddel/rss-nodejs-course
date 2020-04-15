const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/error');
const { validate, schemas } = require('../../common/validate');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  if (!users) {
    throw new ErrorHandler(404, 'Cannot get list of users');
  }
  res.json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const newUser = await usersService.create(req.body);
  res.json(User.toResponse(newUser));
});

router.get('/:id', validate(schemas.userDETAIL, 'params'), async (req, res) => {
  const user = await usersService.findUser(req.params.id);
  if (!user) {
    throw new ErrorHandler(404, 'User cannot find');
  }
  res.json(User.toResponse(user));
});

router.put('/:id', async (req, res) => {
  const updatedUser = await usersService.updateUser(req.params.id, req.body);
  res.json(User.toResponse(updatedUser));
});

router.delete('/:id', async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(204).end();
});

module.exports = router;
