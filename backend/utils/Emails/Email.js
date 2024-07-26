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

export const emailTemplates = {
    traitement: (fullName) => ({
        subject: "Votre demande est encore en traitement",
        html: `<p>Bonjour ${fullName},</p><p>Votre demande est encore en traitement.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    refuse: (demandeur) => ({
        subject: "Votre demande est Refusée",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est Refusée.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    accepte: (demandeur) => ({
        subject: "Votre demande est Acceptée",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est Acceptée.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    saisie: (demandeur) => ({
        subject: "Votre demande est Saisie",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est Saisie.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    preparation: (demandeur) => ({
        subject: "Votre demande est encore en préparation",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est encore en préparation.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    confirme: (demandeur) => ({
        subject: "Votre demande est confirmée par DG",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est confirmée par DG.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
    envoye: (demandeur) => ({
        subject: "Votre demande est envoyée",
        html: `<p>Bonjour ${demandeur},</p><p>Votre demande est envoyée.</p><p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>`
    }),
};
