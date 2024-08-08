import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDemandesThunk, refuseDemandeThunk } from '../redux/demandes/demandeSlice';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Cancel';
import RefuseConfirmationModal from '../components/RefuseConfirmationModal';
import { toast } from 'react-toastify';

const DemandesPage = () => {
  const dispatch = useDispatch();
  const { demandes, loading, error } = useSelector((state) => state.demande);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemandeId, setSelectedDemandeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getDemandesThunk());
  }, [dispatch]);

  const handleOpenModal = (DA_id) => {
    setSelectedDemandeId(DA_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDemandeId(null);
  };

  const handleRefuseDemande = async () => {
    const selectedDemande = demandes.find(demande => demande.DA_id === selectedDemandeId);
    
    if (selectedDemande.Demande_statut === 'Accepter') {
      toast.info('Cette demande est déjà acceptée.');
      handleCloseModal();
      return;
    }

    if (selectedDemande.Demande_statut !== 'Demander') {
      toast.warning('Seules les demandes avec le statut "Demander" peuvent être refusées.');
      handleCloseModal();
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(refuseDemandeThunk(selectedDemandeId)).unwrap();
      toast.success('Demande refusée avec succès');
      handleCloseModal();
    } catch (error) {
      toast.error('Erreur lors du refus de la demande');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching demandes: {error}</Typography>;

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Demander':
        return 'yellow';
      case 'Refuser':
        return 'red';
      case 'Accepter':
        return 'green';
      default:
        return 'transparent';
    }
  };

  const columns = [
    { field: 'DA_id', headerName: 'DA_id', width: 150, headerAlign: 'center', align: 'center' },
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenModal(params.row.DA_id)}>
          <CancelIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const rows = demandes.map((demande) => ({
    id: demande.DA_id, // Ensure each row has a unique 'id' property
    DA_id: demande.DA_id,
    fullName: `${demande.Nom} ${demande.Prenom}`,
    AR_Ref: demande.AR_Ref,
    AR_Design: demande.AR_Design,
    Qty: demande.Qty,
    description: demande.description,
    Demande_statut: demande.Demande_statut,
  }));

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          All Demandes
        </Typography>
        <Paper>
          <div style={{ height: 350, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.DA_id} // Use the 'DA_id' as the unique identifier
            />
          </div>
        </Paper>
      </Box>
      <RefuseConfirmationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleRefuseDemande={handleRefuseDemande}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default DemandesPage;
