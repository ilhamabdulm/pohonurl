const router = require('express').Router();
const LinkController = require('../controllers/linkController');
const Authentication = require('../middlewares/authentication');

router.get('/', Authentication, LinkController.getAll);
router.get('/:id', Authentication, LinkController.getDetails);
router.post('/', Authentication, LinkController.addLink);
router.delete('/:id', Authentication, LinkController.deleteLink);
router.put('/:id', Authentication, LinkController.editLinkDetails);

module.exports = router;
