const express = require('express');
const { register, getData ,deleteData} = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.get("/getData", getData);
router.delete("/deleteData/:id", deleteData);

module.exports = router;
