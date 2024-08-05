import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDemandesThunk } from '../redux/demandes/demandeSlice';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DemandesPage = () => {
  const dispatch = useDispatch();
  const { demandes, loading, error } = useSelector((state) => state.demande);

  useEffect(() => {
    dispatch(getDemandesThunk());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching demandes: {error}</Typography>;

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Demander':
        return 'yellow';
      case 'Refusé':
        return 'red';
      case 'Accepter':
        return 'green';
      default:
        return 'transparent';
    }
  };

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'AR_Ref', headerName: 'Reference', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'AR_Design', headerName: 'Design', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'Qty', headerName: 'Quantity', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'description', headerName: 'Description', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: 'Demande_statut',
      headerName: 'Status',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: getStatusBackgroundColor(params.value),
            color: 'black',
            padding: '3px 10px',
            borderRadius: '15px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  const rows = demandes.map((demande, index) => ({
    id: index + 1,
    fullName: `${demande.Nom} ${demande.Prenom}`,
    ...demande,
  }));

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          All Demandes
        </Typography>
        <Paper>
          <div style={{ height: 350, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default DemandesPage;
