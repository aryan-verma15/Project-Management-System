import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenrator = new Mailgen({
        theme: "default",
        product: {
            name: "Project Management System",
            link: "https://pms.com",
        },
    });

    const emailTextual = mailGenrator.generatePlaintext(options.mailgenContent);

    const emailHTML = mailGenrator.generate(options.mailgenContent);

    // console.log(process.env.MAILTRAP_SMTP_HOST)
    // console.log(process.env.MAILTRAP_SMTP_PORT)
    // console.log(process.env.MAILTRAP_SMTP_USER)
    // console.log(process.env.MAILTRAP_SMTP_PASSWORD)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
    });

    const mail = {
        from: "mail.pms@testing.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Failed to send Email!!!");
        console.error("Error : ", error);
    }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "We're excited to have you on board. Before you can start using your account, we just need to verify that this email address belongs to you.",
            action: {
                instructions:
                    "Please click the button below to verify your email address:",
                button: {
                    color: "#22BC66",
                    text: "Verify Email",
                    link: verificationUrl,
                },
            },
            outro: "This link will expire in 20 minutes for your security. \n\n If you didn't create an account with PMS, you can safely ignore this email. \n\n Thanks, \n The PMS Team",
        },
    };
};

const passwordResetMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We received a request to reset your password for your PMS account.",
            action: {
                instructions:
                    "Click the button below to reset your password. If you didn't request this, you can safely ignore this email.",
                button: {
                    color: "#DC4D2F",
                    text: "Reset Password",
                    link: passwordResetUrl,
                },
            },
            outro: "This password reset link will expire in 20 minutes. \n\n If you continue to have trouble signing in, please contact our support team. \n\n Thanks, \n The PMS Team",
        },
    };
};

export {
    emailVerificationMailgenContent,
    passwordResetMailgenContent,
    sendEmail,
};
