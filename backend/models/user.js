const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, required: true, enum: ['donor', 'volunteer','donor'] },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
