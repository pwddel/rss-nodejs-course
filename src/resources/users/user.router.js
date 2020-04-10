const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/error');

router.get('/', (req, res) => {
  const users = usersService.getAll();
  if (!users) {
    throw new ErrorHandler(404, 'Cannot get list of users');
  }
  res.json(users.map(User.toResponse));
});

router.post('/', (req, res) => {
  const user = new User(req.body);
  usersService.create(User.toDB(user));
  res.json(User.toResponse(user));
});

router.get('/:id', (req, res) => {
  const user = usersService.findUser(req.params.id);
  if (!user) {
    throw new ErrorHandler(404, 'User cannot find');
  }
  res.json(User.toResponse(user));
});

router.put('/:id', (req, res) => {
  const updatedUser = usersService.updateUser(req.params.id, req.body);
  res.json(User.toResponse(updatedUser));
});

router.delete('/:id', (req, res) => {
  usersService.deleteUser(req.params.id);
  res.status(204).end();
});

module.exports = router;
