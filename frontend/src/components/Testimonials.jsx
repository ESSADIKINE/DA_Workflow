import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Testimonials = () => {
    return (
        <Container sx={{ my: 8 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Témoignages
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            "DecayeuxSTM nous a fourni des services de matriçage exceptionnels. Leur attention aux détails et leur engagement envers la qualité sont inégalés."
                        </Typography>
                        <Typography variant="h6">
                            - John Doe, PDG
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            "Nous comptons sur DecayeuxSTM pour tous nos besoins en usinage. Leur expertise et leur livraison rapide ont été cruciales pour nos projets."
                        </Typography>
                        <Typography variant="h6">
                            - Jane Smith, Chef de projet
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            "Les services d'assemblage de DecayeuxSTM sont de premier ordre. Nous ne pourrions pas être plus satisfaits des résultats."
                        </Typography>
                        <Typography variant="h6">
                            - Michael Johnson, Ingénieur
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Testimonials;
