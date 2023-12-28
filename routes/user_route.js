const User = require('../controllers/user_controller');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const registerValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('firstName').notEmpty().isString().withMessage('firstName is required'),
    body('lastName').notEmpty().isString().withMessage('lastName is required'),
    body('password', 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number').notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('category').notEmpty().isNumeric().withMessage('category is required')
];

router.post('/user/register', registerValidationRules, User.register);
router.get('/user/get', User.userall);
router.put('/user/update', User.updatestatus);

module.exports = router;