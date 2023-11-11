import nodemailer from "nodemailer";

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_ADDRESS,
                pass: process.env.MAILER_PASS
            }
        });
    }
    send = async (mailOptions) => {
        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }
    };

    sendActivationMail = async (emailAddress, token) => {
        try {
            this.send({
                to: emailAddress,
                subject: "Todo - app - api| Activate Your Account",
                html: `<a href="http://localhost:3030/users/activate?activationToken=${token}">Verify your email</a>`
            });
        } catch (error) {
            throw error;
        }
    };
    sendPasswordResetToken = async (emailAddress, token) => {
        try {
            this.send({
                to: emailAddress,
                subject: "Todo -app- api | Reset Password",
                html: `<a href="http://localhost:4000/reset-password/passwordResetToken=${token}">Reset Your Password</a>`
            });
        } catch (error) {
            throw error;
        }
    };
}

export const mailer = new Mailer();
