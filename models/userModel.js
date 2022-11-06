const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
    id: ObjectId,
    created_at: Date,
    Firstname: {
        type: String,
        required: true,
    },
    Lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        rquired: true,
        minlenght: [6, 'password must be at least 7 chars']
    },
    blogs: {
        type: Schema.Types.ObjectId, 
        ref: 'blog',
    }
});


UserModel.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next()
});

//Ensuring that the user information is correct
UserModel.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

module.exports = mongoose.model('Users', UserModel);