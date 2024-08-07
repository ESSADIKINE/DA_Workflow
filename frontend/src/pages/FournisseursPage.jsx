import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFournisseursThunk } from '../redux/fournisseurs/fournisseurSlice';
import { Box, Container, Typography, CircularProgress, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const FournisseursPage = () => {
    const dispatch = useDispatch();
    const { fournisseurs, loading, error } = useSelector((state) => state.fournisseur);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFournisseurs, setFilteredFournisseurs] = useState([]);

    useEffect(() => {
        dispatch(fetchAllFournisseursThunk());
    }, [dispatch]);

    useEffect(() => {
        if (fournisseurs.length > 0) {
            setFilteredFournisseurs(
                fournisseurs.filter(fournisseur => 
                    Object.values(fournisseur).some(value => 
                        value !== null && value !== undefined && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
            );
        }
    }, [fournisseurs, searchQuery]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Erreur lors de la récupération des fournisseurs: {error}</Typography>;

    const columns = [
        { field: 'CT_Num', headerName: 'Numéro', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'CT_Nom', headerName: 'Nom', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'CT_Prenom', headerName: 'Prénom', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'CT_EMail', headerName: 'Email', width: 200, headerAlign: 'center', align: 'center' },
        { field: 'CT_Telephone', headerName: 'Téléphone', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'CT_TelPortable', headerName: 'Téléphone Portable', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'CT_Telecopie', headerName: 'Télécopie', width: 150, headerAlign: 'center', align: 'center' }
    ];

    const rows = filteredFournisseurs.map((fournisseur, index) => ({
        id: index + 1,
        ...fournisseur,
    }));

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Tous les Fournisseurs
                </Typography>
                <TextField
                    label="Recherche"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Paper>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                    </div>
                </Paper>
            </Box>
        </Container>
    );
};

export default FournisseursPage;
