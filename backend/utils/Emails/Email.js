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
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est encore en traitement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #4CAF50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est encore en traitement</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Nous tenons à vous informer que votre demande est encore en cours de traitement.</p>
        <p>Nous vous remercions de votre patience et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
        <a href="#" class="button">Consulter votre demande</a>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    refuse: (fullName) => ({
        subject: "Votre demande est Refusée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est Refusée</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #E74C3C;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #E74C3C;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est Refusée</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Nous regrettons de vous informer que votre demande a été refusée.</p>
        <p>Pour plus d'informations, veuillez nous contacter ou consulter votre demande en cliquant sur le bouton ci-dessous.</p>
        <a href="#" class="button">Consulter votre demande</a>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    accepte: (fullName) => ({
        subject: "Votre demande est Acceptée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est Acceptée</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #4CAF50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est Acceptée</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Nous sommes heureux de vous informer que votre demande a été acceptée.</p>
        <p>Pour plus d'informations, veuillez consulter votre demande en cliquant sur le bouton ci-dessous.</p>
        <a href="#" class="button">Consulter votre demande</a>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    saisie: (fullName) => ({
        subject: "Votre demande est Saisie",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est Saisie</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #3498DB;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #3498DB;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est Saisie</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Votre demande est Saisie.</p>
        <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    preparation: (fullName) => ({
        subject: "Votre demande est encore en préparation",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est encore en préparation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #FFA500;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #FFA500;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est encore en préparation</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Votre demande est encore en préparation.</p>
        <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    confirme: (fullName) => ({
        subject: "Votre demande est confirmée par DG",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est confirmée par DG</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #4CAF50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est confirmée par DG</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Votre demande est confirmée par DG.</p>
        <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
    envoye: (fullName) => ({
        subject: "Votre demande est envoyée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est envoyée</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            border-bottom: 2px solid #3498DB;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 20px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #3498DB;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            margin-top: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6I0RGRkZGRiIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhOyBmb250LXNpemU6MjBweDsgZmlsbDojMDAwOyI+TG9nbzwvdGV4dD4KPC9zdmc+Cg==" alt="Logo" class="logo">
            <h1>Votre demande est envoyée</h1>
        </div>
        <p>Bonjour ${fullName},</p>
        <p>Votre demande est envoyée.</p>
        <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>`
    }),
};
