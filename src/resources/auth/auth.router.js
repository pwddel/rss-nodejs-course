const router = require('express').Router();
const authService = require('./auth.service');

router.post('/', authService.loginUsers);

module.exports = router;
