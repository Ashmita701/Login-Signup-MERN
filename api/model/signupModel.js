const moongoose = require('mongoose');
const signupSchema = new moongoose.Schema(
    {
        userName: {
            type: String,
            required: false,
            unique: true,
        },
        name: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        phone_number: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = moongoose.model('Signup', signupSchema);
