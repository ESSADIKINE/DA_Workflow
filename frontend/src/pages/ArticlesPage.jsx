import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllArticlesThunk } from '../redux/articles/articleSlice';
import { Box, Container, Typography, CircularProgress, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ArticlesPage = () => {
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state) => state.article);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        dispatch(fetchAllArticlesThunk());
    }, [dispatch]);

    useEffect(() => {
        if (articles.length > 0) {
            setFilteredArticles(
                articles.filter(article => 
                    Object.values(article).some(value => 
                        value !== null && value !== undefined && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
            );
        }
    }, [articles, searchQuery]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Erreur lors de la récupération des articles: {error}</Typography>;

    const unitWeightMapping = {
        0: 'Tonne',
        1: 'Quintal',
        2: 'Kilogramme',
        3: 'Gramme',
        4: 'Milligramme'
    };

    const stockTrackingMapping = {
        0: 'Aucun',
        1: 'Sérialisé',
        2: 'CMUP',
        3: 'FIFO',
        4: 'LIFO',
        5: 'Par lot'
    };

    const columns = [
        { field: 'AR_Ref', headerName: 'Référence', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'AR_Design', headerName: 'Désignation', width: 200, headerAlign: 'center', align: 'center' },
        { field: 'FA_CodeFamille', headerName: 'Code Famille', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'AR_PoidsNet', headerName: 'Poids Net', width: 150, headerAlign: 'center', align: 'center' },
        {
            field: 'AR_UnitePoids', headerName: 'Unité de Poids', width: 150, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return unitWeightMapping[params.value];
            }
        },
        { field: 'AR_CodeBarre', headerName: 'Code Barre', width: 150, headerAlign: 'center', align: 'center' },
        {
            field: 'AR_SuiviStock', headerName: 'Suivi du Stock', width: 150, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return stockTrackingMapping[params.value];
            }
        }
    ];

    const rows = filteredArticles.map((article, index) => ({
        id: index + 1,
        ...article,
    }));

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Tous les Articles
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

export default ArticlesPage;
