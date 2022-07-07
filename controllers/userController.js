const db = require('../models/index');
const {generateToken} = require('../utils/jwtHelper');

const md5 = require('md5');

/**
 * @method POST
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await md5(password);

        const user = await db.userModel.findOne({ email });
        if (hashedPassword != user.password) {
            res.status(400).json({ status: 'Error', message: 'Invalid Credentials' });
        }
        const token = generateToken(user);

        res.status(201).json({ status: 'success', message: 'Logged In Successfully', data: { user: user, token } });


    } catch (err) {

    }
}

/**
 * @method POST
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password} = req.body;
        const oldEmail = await db.userModel.findOne({ email })
        if (oldEmail) {
            res.status(400).json({ status: 'Error', message: 'Email already exists' })
        }
        const hashedPassword = await md5(password);
        const user = await db.userModel.create({ name, email, password: hashedPassword});

        const token = generateToken(user);

        res.status(201).json({ status: 'success', message: 'User Created', data: { user: user, token } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": "Error", error: err });
    }
}
