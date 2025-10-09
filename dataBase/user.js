const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // ensures each email is unique,
        lowercase: true,
        trim: true,
        index: true,
        match: [/^\S+@\S+\.\S+$/,'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum:['user','admin','modifier'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });


//this is used because the controller forget the hash password when register so without any error or password storing it hash the password
userSchema.pre('save',async function(next) {
    try {
        if(!this.isModified('password')) return next();
        this.password= await bcrypt.hash(this.password,10);
        next();

    }catch(err) {
        next(err)
    }
}),

userSchema.method.isadmin=function () {
    return this.role==='admin';
}

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase().trim() })
}

userSchema.virtual('publicProfile').get(function() {
    return {
        id: this.id,
        username: this.username,
        email : this.email,
        role: this.role,
        verified : this.verified,
        createdAt : this.createdAt
    }
})

module.exports = mongoose.model('User', userSchema);
