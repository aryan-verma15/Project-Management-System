import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    verifyEmail,
    resendEmialVerification,
    refreshAccessToken,
    forgotPasswordRequest,
    resetForgotPassword,
    changeCurrentPassowrd,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// unsecured routes

// prettier-ignore
router
    .route("/register")
    .post(
        userRegisterValidator(), 
        validate, 
        registerUser
    );

// prettier-ignore
router
    .route("/login")
    .post(
        userLoginValidator(), 
        validate, 
        loginUser
    );

// prettier-ignore
router
    .route("/verify-email/:verificationToken")
    .get(verifyEmail);

// prettier-ignore
router
    .route("/refresh-token")
    .post(refreshAccessToken);

// prettier-ignore
router
    .route("/forgot-passowrd")
    .post(
        userForgotPasswordValidator(), 
        validate, 
        forgotPasswordRequest
    );

// prettier-ignore
router
    .route("/reset-passowrd/:resetToken")
    .post(
        userResetForgotPasswordValidator(), 
        validate, 
        resetForgotPassword
    );

    
// secure routes

// prettier-ignore
router
    .route("/logout")
    .post(verifyJWT, logoutUser);

// prettier-ignore
router
    .route("/current-user")
    .post(verifyJWT, getCurrentUser);

// prettier-ignore
router
    .route("/change-password")
    .post(
        verifyJWT,
        userChangeCurrentPasswordValidator(),
        validate,
        changeCurrentPassowrd,
    );

// prettier-ignore
router
    .route("/resent-email-verification")
    .post(verifyJWT, resendEmialVerification);

export default router;
