/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Grid, Typography, Button, Container } from '@mui/material';
import backgroundImg from '../assets/Decayeuxstm.webp';

const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <Container>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                    Bienvenue chez DecayeuxSTM
                </Typography>
                <Typography variant="h5" sx={{ my: 4 }}>
                    Suivi de vos demandes d'achat de manière fluide
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    En savoir plus
                </Button>
            </Container>
        </Box>
    );
};

export default HeroSection;
