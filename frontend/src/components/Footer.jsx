import { Box, Container, Grid, IconButton, Typography, Link } from '@mui/material';
import React from 'react';
import facebookIcon from '../assets/FacebookIcon.svg';
import instaIcon from '../assets/InstagramIcon.svg';
import linkIcon from '../assets/LinkedinIcon.svg';
import siteIcon from '../assets/SitewebIcon.svg';

const Footer = () => {
    return (
        <Box sx={{ mt: 0, py: 4, backgroundColor: 'primary.main', color: 'white' }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            DecayeuxSTM
                        </Typography>
                        <Typography variant="body2">
                            DecayeuxSTM est spécialisé dans le matriçage, l'usinage et l'assemblage d'alliages non ferreux.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Liens Rapides
                        </Typography>
                        <Link href="#" color="inherit" underline="hover">
                            Politique de Confidentialité
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="hover">
                            Termes et Conditions
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Suivez-nous
                        </Typography>
                        <IconButton href="#" color="inherit">
                            <img src={facebookIcon} alt="Facebook" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={instaIcon} alt="Instagram" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={linkIcon} alt="Linkedin" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={siteIcon} alt="Site web" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2">
                        &copy; 2024 DecayeuxSTM. Tous droits réservés.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
