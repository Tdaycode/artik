const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/register/artisian', validate(authValidation.register), authController.createArtisan);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/update-user/:userId', authController.updateUsers);

module.exports = router;
