const User = require('../models/user');


const register = async (req, res) => {
    try{
        const {name, email, password, address, mobile, role, description}=req.body;
        console.log(req.body);
        const user = new User({name, email, password, address, mobile, role, description});
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