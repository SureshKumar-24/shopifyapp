const User = require('../controllers/user_controller');
const express = require('express');
const { body,query } = require('express-validator');
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
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User operations
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user.
 *     description: Registers a new user with the provided details.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               category:
 *                 type: integer
 *                 description: The category of the user.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               msg: "User Signup Successfully"
 *               data:
 *                 id: 1
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "user@example.com"
 *                 category: 1
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 400
 *               msg: "Email is Already Registered"
 *       '422':
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 422
 *               errors:
 *                 - field: "email"
 *                   message: "Email is required"
 *                 - field: "password"
 *                   message: "Password must be at least 6 characters"
 *                 # Add more error details based on your validation criteria
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               msg: "Internal Server Error"
 */
router.post('/user/register', registerValidationRules, User.register);

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get a list of users.
 *     description: Retrieve a list of user details based on provided parameters.
 *     tags: [User]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: true
 *         description: The number of items to return per page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *       - name: categorytype
 *         in: query
 *         required: false
 *         description: The category type (optional).
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: searchvalue
 *         in: query
 *         required: false
 *         description: The search value for filtering users (optional).
 *         schema:
 *           type: string
 *           example: Kumar
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               msg: "User data retrieved successfully."
 *               data:
 *                 - firstName: "Suresh"
 *                   lastName: "Kumar"
 *                   email: "sk20012404@gmail.com"
 *                   category: 0
 *                   status: null
 *                 - firstName: "Rohit"
 *                   lastName: "Kumar"
 *                   email: "rohit123@gmail.com"
 *                   category: 0
 *                   status: 1
 *               count: 2
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               msg: "Internal Server Error"
 */
router.get('/user/get', User.userall);
/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update user status.
 *     description: Update the status of a user based on the provided email.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               status:
 *                 type: integer
 *                 description: The new status for the user.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               msg: "User Status Updated Successfully"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 404
 *               msg: "User doesn't exist"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               msg: "Internal Server Error"
 */
router.put('/user/update', User.updatestatus);

// Swagger annotations for delete user
/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by email.
 *     description: Deletes a user based on the provided email.
 *     tags: [User]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         description: The email address of the user to be deleted.
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               msg: "User Deleted Successfully"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 404
 *               msg: "User doesn't exist"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               msg: "Internal Server Error"
 */
router.delete('/user/delete', [
    query('email').isEmail().withMessage('Invalid email address'),
  ], User.deleteUser);
module.exports = router;