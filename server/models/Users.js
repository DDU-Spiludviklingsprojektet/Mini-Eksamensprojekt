const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedQuizzes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: Object,
        required: false,
        contains: {
            url: {
                type: String,
            },
            publicid: {
                type: String
            }
        }
    },
    deletet: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('Users', UserSchema);