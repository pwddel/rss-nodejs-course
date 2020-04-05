const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', (req, res) => {
  const users = usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.post('/', (req, res) => {
  const user = new User(req.body);
  usersService.create(User.toDB(user));
  res.json(User.toResponse(user));
});

router.get('/:id', (req, res) => {
  const user = usersService.findUser(req.params.id);
  console.log('Route get /:id user:', user);
  console.log('Route get /:id id:', req.params.id);
  res.json(User.toResponse(user));
});

router.put('/:id', (req, res) => {
  console.log('Route put updated user:', req.body);
  const updatedUser = usersService.updateUser(req.params.id, req.body);
  /* console.log('Route put updated user:', updatedUser);*/
  res.json(User.toResponse(updatedUser));
});

router.delete('/:id', (req, res) => {
  usersService.deleteUser(req.params.id);
  res.status(204).end();
});

module.exports = router;
