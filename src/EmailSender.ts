import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const getTransport = () => {
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

    return transport;
};

export const sendPortfolioEmail = (
    email: string,
    name: string,
    message: string
): Promise<Object> => {
    const transport = getTransport();

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

// export const sendEmail = async (emailAddress: string, heading: string, emailMessage: string) => {
//     const transport = getTransport();
//     const __dirname = path.resolve();
//     const email = new Email({
//         message: {
//             from: process.env.EMAIL,
//         },
//         send: true,
//         transport,
//     });

//     try {
//         await email
//             .send({
//                 template: 'message',
//                 message: {
//                     to: emailAddress,
//                 },
//                 locals: {
//                     heading,
//                     message: emailMessage,
//                 },
//             })
//             .catch(console.error);

//         return { success: true };
//     } catch (error) {
//         return { success: false, error: 'Error sending email' };
//     }
// };

export const sendEmail = async (emailAddress: string, heading: string, emailMessage: string) => {
    const transporter = getTransport();

    let options = {
        to: emailAddress, // List of recipients
        subject: heading, // Subject line
        text: emailMessage, // Plain text body
        from: process.env.EMAIL,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, function (err: Error | null, info: any) {
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
