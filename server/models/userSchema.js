const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 4,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('User', userSchema);