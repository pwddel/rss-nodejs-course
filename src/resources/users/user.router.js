const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    res.json(usersService.createUser());
  });

router
  .route('/:id')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    console.log('Validate ID');
    next();
  })
  // eslint-disable-next-line no-unused-vars
  .get((req, res, next) => {
    const userId = req.params.id;
    const user = usersService.findUser(userId);

    console.log('User finded:', user);
    console.log('ID:', req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.json({ message: `User: ${userId} doesn't exist` });
    }
    res.json(req.user);
  })
  // eslint-disable-next-line no-unused-vars
  .put((req, res, next) => {
    const userId = req.params.id;
    const userBody = req.body;
    usersService.updateUser(userId, userBody);

    res.status(200).send('The user has been updated.');
  })
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  // eslint-disable-next-line no-unused-vars
  .delete((req, res, next) => {
    const userId = req.params.id;
    console.log('Delete User with id: ', userId);
    // filter list copy, by excluding user to delete
    usersService.deleteUser(userId);
    res.status(204).send('The user has been deleted');
  });

module.exports = router;
