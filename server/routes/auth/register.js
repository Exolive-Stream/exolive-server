const config = require("../../../config.js");
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');

// Registrar un nuevo usuario
const register = async (req, res) => {
    if(!req.body.username || !req.body.email || !req.body.password) return res.status(400).json({error: 'MISSING_DATA'});
    

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'USER_EXIST' });
        }

        user = new User({
            username,
            email,
            password
        });

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(payload, config.SECRET_TOKEN , { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({error: 'INTERNAL_SERVER_ERROR'});
    }
};

module.exports = register;