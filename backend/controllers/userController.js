const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


const register = async (req, res) => {
    try{
        const {email,password,role}=req.body;
        console.log(email,password,role);
        const user = new User({email,password,role});
        await user.save();
        res.status(201).json({ message: 'Data registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
    

}

const getData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteData= async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, getData ,deleteData};