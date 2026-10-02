import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),

        body("username")
            .trim()
            .isEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must  be in lower case")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long"),

        body("password")
            .trim()
            .isEmpty()
            .withMessage("Password is required")
            .isLength({ min: 5 })
            .withMessage("Username must be at least 5 characters long"),

        body("fullname").optional().trim(),
    ];
};

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid Email"),

        body("password").trim().notEmpty().withMessage("Password is required"),
    ];
};

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
            .trim()
            .notEmpty()
            .withMessage("Old Password is required"),

        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("New Password is required")
            .isLength({ min: 5 })
            .withMessage("Username must be at least 5 characters long"),
    ];
};

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
    ];
};

const userResetForgotPasswordValidator = () => {
    return [
        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("Passowrd is reqired")
            .isLength({ min: 5 })
            .withMessage("Username must be at least 5 characters long"),
    ];
};

export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
};
