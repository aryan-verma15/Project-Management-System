import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// model
const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: `https://placehold.co/200x200`,
                localStorage: "",
            },
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName: {
            type: String,
            trim: true,
        },

        password: {
            type: String,
            reqirued: [true, "Password is required!!!"],
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
        },

        forgotPasswordToken: {
            type: String,
        },

        forgotPasswordExpiry: {
            type: Date,
        },

        emailVerificationToken: {
            type: String,
        },

        emailVerificationExpiry: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

// hooks -> pre and post
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// functions/methods -> methods and statics
// userSchema.methods -> for a particular document
// userSchema.statics -> method for whole model
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// with data tokens -> header.payload.signature
userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        //secret
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIARY,
        },
    );
};

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        //payload -
        {
            _id: this._id,
        },
        //secret
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIARY,
        },
    );
};

// token without data
userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    const tokenExpiry = Date.now() + 20 * 60 * 1000;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
