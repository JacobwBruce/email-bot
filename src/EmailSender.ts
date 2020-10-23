import dotenv from 'dotenv';
import { promises } from 'fs';
import nodemailer from 'nodemailer';
import { resolve } from 'path';

export const sendEmail = (email: string, name: string, message: string): Promise<Object> => {
    dotenv.config();
    let transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
        },
    });

    const text = `EMAIL: ${email}\nNAME: ${name}\n\n ${message}`;

    let options = {
        to: 'Jacobwbruce@hotmail.com', // List of recipients
        subject: 'Portfolio Contact Form', // Subject line
        text, // Plain text body
        from: process.env.EMAIL,
    };

    return new Promise((resolve, reject) => {
        transport.sendMail(options, function (err: Error | null, info: any) {
            if (err) {
                console.log(err);
                resolve({ ...err, error: true });
            } else {
                console.log(info);
                resolve({ ...info, error: false });
            }
        });
    });
};
