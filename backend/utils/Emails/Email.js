import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587, // You can also use 465 for secure (SSL/TLS) connection
    secure: false, // true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"DecayeuxSTM" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (err) {
        console.error(`Failed to send email to ${to}: ${err.message}`);
    }
};

