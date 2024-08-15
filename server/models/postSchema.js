const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    comments:[{
       text: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
       
    }]
})

module.exports = mongoose.model('Post', postSchema);