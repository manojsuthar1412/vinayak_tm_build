const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        lastname: {
            type: String,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        userinfo: {
            type: String,
            trim: true
        },
        encry_password: {
            type: String,
            required: true
        },  
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        purchases: {
            type: Array,
            default: []
        }
    }, {timestamps: true} 
);



userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })




userSchema.methods = {

    authenticate: function(plain_password) {
        return this.securePassword(plain_password) === this.encry_password;
    },

    securePassword: function(plain_password) {
        if(!plain_password) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plain_password)
                .digest("hex");
        } catch(err) {
            return err;
        }
    }
};



module.exports = mongoose.model("User", userSchema);