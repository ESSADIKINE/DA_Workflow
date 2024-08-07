import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddDAForm = () => {
  const [da, setDa] = useState({
    DO_Ref: '',
    DO_Tiers: '',
    fullName: '',
    DO_Devise: '',
    DE_Intitule: '',
    E_Intitule: '',
    CA_Intitule: '',
    DO_Coord01: '',
    DO_DateLivr: '',
    DUM: '',
    P_BRUT: '',
    COMMENTAIRES: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDa((prevDa) => ({
      ...prevDa,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('da', JSON.stringify(da));
    navigate('/add-articles');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Create New DA
        </Typography>
        <Paper sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="DO Ref"
              name="DO_Ref"
              value={da.DO_Ref}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="DO Tiers"
              name="DO_Tiers"
              value={da.DO_Tiers}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Full Name"
              name="fullName"
              value={da.fullName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="DO Devise"
              name="DO_Devise"
              value={da.DO_Devise}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="DE Intitule"
              name="DE_Intitule"
              value={da.DE_Intitule}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="E Intitule"
              name="E_Intitule"
              value={da.E_Intitule}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="CA Intitule"
              name="CA_Intitule"
              value={da.CA_Intitule}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="DO Coord01"
              name="DO_Coord01"
              value={da.DO_Coord01}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="DO Date Livr"
              name="DO_DateLivr"
              type="date"
              value={da.DO_DateLivr}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="DUM"
              name="DUM"
              value={da.DUM}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="P BRUT"
              name="P_BRUT"
              type="number"
              value={da.P_BRUT}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Commentaires"
              name="COMMENTAIRES"
              value={da.COMMENTAIRES}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddDAForm;
