export const emailTemplates = {
    traitement: (fullName, DL_Design) => ({
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande est encore en traitement</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous tenons à vous informer que votre demande de <b>${DL_Design}</b> est encore en cours de traitement.</p>
            <p>Nous vous remercions de votre patience et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    refuse: (fullName, DL_Design) => ({
        subject: "Votre demande a été refusée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande a été refusée</title>
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande a été refusée</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous regrettons de vous informer que votre demande de <b>${DL_Design}</b> a été refusée.</p>
            <p>Pour plus d'informations, veuillez nous contacter ou visiter notre site web.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    accepte: (fullName, DL_Design) => ({
        subject: "Votre demande a été acceptée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande a été acceptée</title>
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande a été acceptée</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous avons le plaisir de vous informer que votre demande de <b>${DL_Design}</b> a été acceptée.</p>
            <p>Nous vous remercions de votre confiance et restons à votre disposition pour toute information complémentaire.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    saisie: (fullName, DL_Design) => ({
        subject: "Votre demande a été saisie",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande a été saisie</title>
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande a été saisie</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous tenons à vous informer que votre demande de <b>${DL_Design}</b> a été saisie.</p>
            <p>Nous vous remercions de votre patience et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    preparation: (fullName, DL_Design) => ({
        subject: "Votre demande est en préparation",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande est en préparation</title>
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande est en préparation</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous tenons à vous informer que votre demande de <b>${DL_Design}</b> est en préparation.</p>
            <p>Nous vous remercions de votre patience et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    confirme: (fullName, DL_Design) => ({
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande est confirmée par DG</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous tenons à vous informer que votre demande de <b>${DL_Design}</b> a été confirmée par la Direction Générale.</p>
            <p>Nous vous remercions de votre patience et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
    envoye: (fullName, DL_Design) => ({
        subject: "Votre demande a été envoyée",
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande a été envoyée</title>
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
            max-width: 70%;
            margin: auto;
            text-align: center;
        }
        .header {
            border-bottom: 2px solid #e19c23;
            margin-bottom: 20px;
            padding-bottom: 10px;
            text-align: center;
        }
        .footer {
            border-top: 1px solid #ddd;
            margin-top: 0px;
            padding-top: 10px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            background-color: #e19c23;
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
        .contact-info {
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
        }
        .contact-info p {
            margin: 5px 0 0 0;
        }
        .img {
            width: 15%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="Main">
            <div class="header">
                <img src="https://dstm.website/wp-content/uploads/2024/07/dstm.png" alt="Logo" class="logo">
                <h1>Votre demande a été envoyée</h1>
            </div>
            <p>Bonjour <b>${fullName}</b>,</p>
            <p>Nous tenons à vous informer que votre demande de <b>${DL_Design}</b> a été envoyée.</p>
            <p>Nous vous remercions de votre confiance et vous assurons que nous mettons tout en œuvre pour finaliser votre demande dans les meilleurs délais.</p>
            <a href="https://dstm.website" target="_blank" class="button">Plus d'info</a>
        </div>
        <div class="contact-info">
            <img class="img" src="https://dstm.website/wp-content/uploads/2024/07/unnamed.png" alt="Company Location">
            <p>
                <span>Local D, CIB, Zone industrielle</span><br>
                <span>13100 - Bouznika - Maroc</span>
            </p>
            <p>
                <span>Tél : (+212) 537 74 57 43</span><br>
                <span>Fax : (+212) 537 74 57 44</span><br>
                <a href="https://dstm.website" target="_blank" rel="noopener">www.dstm.website</a>
            </p>
        </div>
        <p class="footer">Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
    </div>
</body>
</html>
`
    }),
};
