const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.post('/', RoleController.create);
router.get('/', RoleController.getAll);
router.get('/:role_id', RoleController.getOne);
router.put('/:role_id', RoleController.update);
router.delete('/:role_id', RoleController.delete);
router.get('/:role_id/applicants', RoleController.viewApplicants);

module.exports = router;
