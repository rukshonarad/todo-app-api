import { prisma } from "../prisma/index.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { bcrypt } from "../utils/bcrypt.js";
import { date } from "../utils/date.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/custom-error.js";

class UserService {
    signUp = async (userInput) => {
        const hashedPassword = await bcrypt.hash(userInput.password);

        const user = await prisma.user.create({
            data: {
                ...userInput,
                password: hashedPassword
            },
            select: {
                id: true
            }
        });
    };

    login = async (input) => {
        const user = await prisma.user.findFirst({
            where: {
                email: input.email
            },
            select: {
                id: true,
                password: true
            }
        });

        if (!user) throw new CustomError("User does not exist", 404);

        const isPasswordMatches = await bcrypt.compare(
            input.password,
            user.password
        );
        if (!isPasswordMatches) {
            throw new CustomError("Invalid Credentials", 401);
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2 days"
            }
        );

        return token;
    };

    forgotPassword = async (email) => {
        const user = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                id: true
            }
        });

        if (!user)
            throw new CustomError(
                "We could not find a user with the email you provided",
                404
            );

        const passwordResetToken = crypto.createToken();
        const hashedPasswordResetToken = crypto.hash(passwordResetToken);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                passwordResetToken: hashedPasswordResetToken,
                passwordResetTokenExpirationDate: date.addMinutes(10)
            }
        });

        await mailer.sendPasswordResetToken(email, passwordResetToken);
    };

    resetPassword = async (token, password) => {
        const hashedPasswordResetToken = crypto.hash(token);
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: hashedPasswordResetToken
            },
            select: {
                id: true,
                passwordResetToken: true,
                passwordResetTokenExpirationDate: true
            }
        });

        if (!user) throw new CustomError("Invalid Token", 401);

        const currentTime = new Date();
        const tokenExpDate = new Date(user.passwordResetTokenExpirationDate);

        if (tokenExpDate < currentTime)
            throw new CustomError("Reset Token Expired", 422);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: await bcrypt.hash(password),
                passwordResetToken: null,
                passwordResetTokenExpirationDate: null
            }
        });
    };

    getMe = async (userId) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstName: true,
                lastName: true,
                preferredFirstName: true,
                email: true
            }
        });

        if (!user) {
            throw new Error("User does not exist anymore, 404");
        }

        return user;
    };
}

export const userService = new UserService();
