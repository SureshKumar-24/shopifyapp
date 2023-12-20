// const User = require('../models/user');
const bcrypt = require("bcrypt");
const models = require("../models");
const User = models.User;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, status: 422, errors: errors.array() });
        }
        try {
            const { email, password, firstName, lastName, category } = req.body;

            const userExist = await User.findOne({ where: { email: email } });
            if (userExist) {
                return res.status(400).json({ success: false, status: 400, msg: "Email is Already Registered" })
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                firstName,
                lastName,
                email,
                category,
                password: hashedPassword
            });
            return res.status(201).json({ success: true, status: 201, msg: "User Signup Successfully", data: newUser });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, status: 500, msg: "Internal Server Error", error: error.msg });
        }
    },

    userall: async (req, res) => {
        try {
            let { categorytype, searchvalue, page, limit } = req.query;
            limit = parseInt(limit);
            const offset = (page - 1) * limit;

            if (searchvalue || categorytype) {
                const whereConditions = {};

                if (searchvalue) {
                    whereConditions[Op.or] = [
                        { firstName: { [Op.like]: `%${searchvalue}%` } },
                        { lastName: { [Op.like]: `%${searchvalue}%` } },
                        { email: { [Op.like]: `%${searchvalue}%` } },
                    ];
                }

                if (categorytype) {
                    whereConditions.category = categorytype;
                }

                const { rows, count } = await User.findAndCountAll({
                    where: whereConditions,
                    attributes: ['firstName', 'lastName', 'email', 'category', 'status'],
                    offset: offset,
                    limit: limit,
                    order: [['createdAt', 'DESC']],
                });
                return res.status(200).json({ success: true, msg: "User Data Successfully", data: rows, count: count });
            } else {
                const { rows, count } = await User.findAndCountAll({
                    attributes: ['firstName', 'lastName', 'email', 'category', 'status'],
                    offset: offset,
                    limit: limit,
                    order: [["createdAt", "DESC"]],
                });
                return res.status(200).json({ success: true, msg: "User Data Successfully", data: rows, count: count });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, status: 500, msg: "Internal Server Error", error: error.msg });
        }
    },
    updatestatus: async (req, res) => {
        try {
            const { email, status } = req.body;

            const userupdate = await User.update({ status: status }, {
                where: {
                    email: email,
                },
            });
            if (!userupdate) {
                return res.status(404).json({ success: false, status: 404, msg: "User doesn't exist " });
            }
            return res.status(200).json({ success: true, status: 200, msg: "User Status Updated Successfullly" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, status: 500, msg: "Internal Server Error", error: error.msg });
        }
    },

}