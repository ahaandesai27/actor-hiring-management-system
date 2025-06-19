const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const RoleApplicationController = require('../controllers/roleApplicationController');


router.post('/', RoleController.create);
router.get('/search', RoleController.search);
router.get('/:role_id', RoleController.getOne);
router.put('/:role_id', RoleController.update);
router.delete('/:role_id', RoleController.delete);
router.patch('/:role_id/offer', RoleApplicationController.setOfferedTo);
router.get('/:role_id/applicants', RoleApplicationController.viewApplicants);

module.exports = router;
