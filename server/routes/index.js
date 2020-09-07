const router = require('express').Router();
const User = require('./user');
const Link = require('./link');

router.use('/users', User);
router.use('/links', Link);

module.exports = router;
