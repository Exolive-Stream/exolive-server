const router = require("express").Router();
const auth = require("./auth/router");

router.use('/api/auth', auth);

module.exports = router;