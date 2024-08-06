import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const AboutUs = () => {
    return (
        <Container sx={{ my: 8 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                À propos de DecayeuxSTM
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                DecayeuxSTM est spécialisé dans le matriçage, l'usinage et l'assemblage d'alliages non ferreux.
                Avec des années d'expérience et un engagement envers la qualité, nous sommes votre partenaire de choix pour des solutions sur mesure
                dans des secteurs tels que le transfert d'énergie électrique, la plomberie et la climatisation. Notre expertise et notre dévouement
                garantissent des résultats exceptionnels pour chaque projet.
            </Typography>
        </Container>
    );
};

export default AboutUs;
