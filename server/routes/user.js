const router = require('express').Router();
const UserController = require('../controllers/userController');
const Authentication = require('../middlewares/authentication');

router.get('/', Authentication, UserController.getUserInfo);
router.put('/', Authentication, UserController.updateUserInfo);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
