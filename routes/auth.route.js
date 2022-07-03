const express = require('express');
const validate = require('../middleware/validate');
const {protect, artisan}= require('../middleware/auth');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/register/artisan', validate(authValidation.register), authController.createArtisan);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.put('/update-user/artisan',protect, artisan, authController.updateUsers);
router.put('/update-user/user',protect, authController.editUser);
router.post('/post-job', protect, authController.postJobs);
router.get('/get-single-user', protect, authController.getSingleUsers);

module.exports = router;
