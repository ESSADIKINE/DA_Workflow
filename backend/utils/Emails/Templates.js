export const emailTemplates = {
    resetPassword: (demandeur, verificationToken) => ({
        subject: 'Réinitialisation du mot de passe',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous:</p>
            <a href="${process.env.CLIENT_URL}/reset-password?token=${verificationToken}" style="background-color: #5a2ce2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Réinitialiser le mot de passe</a>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    acceptation_DA: (demandeur) => ({
        subject: 'Acceptation de la demande d\'achat',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre demande d'achat a été acceptée.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    refus_DA: (demandeur) => ({
        subject: 'Refus de la demande d\'achat',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre demande d'achat a été refusée.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    confirmation_DA: (demandeur) => ({
        subject: 'Confirmation de la demande d\'achat',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre demande d'achat a été confirmée.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    modification_DA: (demandeur) => ({
        subject: 'Modification de la demande d\'achat',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre demande d'achat a été modifiée.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    acceptation_BC: (demandeur) => ({
        subject: 'Acceptation du bon de commande',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre bon de commande a été accepté.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    refus_BC: (demandeur) => ({
        subject: 'Refus du bon de commande',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre bon de commande a été refusé.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    confirmation_BC: (demandeur) => ({
        subject: 'Confirmation du bon de commande',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre bon de commande a été confirmé.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    modification_BC: (demandeur) => ({
        subject: 'Modification du bon de commande',
        html: `
            <p>Bonjour ${demandeur},</p>
            <p>Votre bon de commande a été modifié.</p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    }),
    demande_devis: (emails) => ({
        subject: 'Nouvelle demande de devis',
        html: `
            <p>Vous avez reçu une nouvelle demande de devis </p>
            <p>Cet email est généré automatiquement. Veuillez ne pas y répondre.</p>
        `
    })
};
