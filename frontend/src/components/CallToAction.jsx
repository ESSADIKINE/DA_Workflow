import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const CallToAction = () => {
    return (
        <Box sx={{ py: 4, my: 0, backgroundColor: 'secondary.main', color: 'white' }}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                    Prêt à commencer votre prochain projet ?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Contactez-nous dès aujourd'hui pour discuter de la manière dont DecayeuxSTM peut vous aider à obtenir des résultats exceptionnels grâce à nos services experts.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Contactez-nous
                </Button>
            </Container>
        </Box>
    );
};

export default CallToAction;
