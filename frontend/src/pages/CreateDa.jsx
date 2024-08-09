import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Paper, TextField, Autocomplete, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';
import { fetchCollaborateur, fetchAllCT_Num, fetchDO_Devise, fetchAllDepot, fetchExpedition, fetchAllAffaire, fetchTaxe, fetchAllEU_Enumere, fetchAllDemandeur, setDa } from '../redux/da/daSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import French locale
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import calendar icon

dayjs.locale('fr'); // Set locale to French

const AddDAForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CO_No, CT_Num, DE_No, DO_Devise, DO_Expedit, CA_Num, da, loading } = useSelector((state) => state.da);
  const [errors, setErrors] = useState({});
  const [formattedDate, setFormattedDate] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    console.log('Component: Fetching all initial data');
    dispatch(fetchCollaborateur());
    dispatch(fetchAllCT_Num());
    dispatch(fetchDO_Devise());
    dispatch(fetchAllDepot());
    dispatch(fetchExpedition());
    dispatch(fetchAllAffaire());
    dispatch(fetchTaxe());
    dispatch(fetchAllEU_Enumere());
    dispatch(fetchAllDemandeur());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Component: Changing ${name} to ${value}`);
    dispatch(setDa({ [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));

    if (name === 'DO_DateLivr') {
      setFormattedDate(value);
    }
  };

  const handleAutocompleteChange = (name, value) => {
    console.log(`Component: Changing ${name} to ${value}`);
    dispatch(setDa({ [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !da.fullName,
      DO_Tiers: !da.DO_Tiers,
      E_Intitule: !da.E_Intitule,
      DE_Intitule: !da.DE_Intitule,
      DO_Devise: !da.DO_Devise,
      DO_DateLivr: !formattedDate || dayjs(formattedDate).isBefore(dayjs(), 'day')
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);

    if (hasError) {
      toast.error('Remplir tous les champs obligatoires *');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set the time part to T00:00:00.000Z
      const isoFormattedDate = dayjs(formattedDate).startOf('day').toISOString();

      const dataToStore = {
        ...da,
        DO_DateLivr: isoFormattedDate, // Store the formatted date with default time
      };

      console.log('Component: Submitting form', dataToStore);
      localStorage.setItem('da', JSON.stringify(dataToStore));
      navigate('/add-articles');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nouveau Demande d'achat
        </Typography>
        <Paper sx={{ p: 4, width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ py: 0 }}>
              <Grid item xs={4}>
                <TextField
                  label="Référence"
                  name="DO_Ref"
                  value={da.DO_Ref || ''}
                  onChange={handleChange}
                  fullWidth
                  error={errors.DO_Ref}
                  sx={{ borderColor: errors.DO_Ref ? 'red' : '' }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Entête 01"
                  name="DO_Coord01"
                  value={da.DO_Coord01 || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} style={{ position: 'relative' }}>
                <TextField
                  label="Date de Livraison"
                  type="date"
                  name="DO_DateLivr"
                  value={formattedDate}
                  onChange={handleChange}
                  fullWidth
                  error={errors.DO_DateLivr}
                  sx={{ borderColor: errors.DO_DateLivr ? 'red' : '' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CalendarTodayIcon
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '60%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="DUM"
                  name="DUM"
                  value={da.DUM || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="P BRUT"
                  name="P_BRUT"
                  value={da.P_BRUT || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Commentaires"
                  name="COMMENTAIRES"
                  value={da.COMMENTAIRES || ''}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ py: 10 }}>
              <Grid item xs={6}>
                <FormControl fullWidth error={errors.fullName}>
                  <InputLabel id="fullName-label">Acheteur</InputLabel>
                  <Select
                    labelId="fullName-label"
                    id="fullName-select"
                    value={da.fullName || ''}
                    name="fullName"
                    onChange={handleChange}
                    label="Acheteur"
                    sx={{ borderColor: errors.fullName ? 'red' : '' }}
                  >
                    {CO_No && CO_No.map((option) => (
                      <MenuItem key={option.NomPrenom} value={option.NomPrenom}>
                        {option.NomPrenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={CT_Num}
                  getOptionLabel={(option) => option.CT_Num || ''}
                  value={CT_Num.find((option) => option.CT_Num === da.DO_Tiers) || null}
                  onChange={(event, value) => handleAutocompleteChange('DO_Tiers', value?.CT_Num || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fournisseur"
                      placeholder="Tapez pour rechercher..."
                      error={errors.DO_Tiers}
                      sx={{ borderColor: errors.DO_Tiers ? 'red' : '' }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={errors.E_Intitule}>
                  <InputLabel id="expedition-label">Expédition</InputLabel>
                  <Select
                    labelId="expedition-label"
                    id="expedition-select"
                    value={da.E_Intitule || ''}
                    name="E_Intitule"
                    onChange={handleChange}
                    label="Expédition"
                    sx={{ borderColor: errors.E_Intitule ? 'red' : '' }}
                  >
                    {DO_Expedit && DO_Expedit.map((option, index) => (
                      <MenuItem key={`${option.E_Intitule}-${index}`} value={option.E_Intitule}>
                        {option.E_Intitule}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={DE_No}
                  getOptionLabel={(option) => option.DE_Intitule || ''}
                  value={DE_No.find((option) => option.DE_Intitule === da.DE_Intitule) || null}
                  onChange={(event, value) => handleAutocompleteChange('DE_Intitule', value?.DE_Intitule || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dépôt"
                      placeholder="Tapez pour rechercher..."
                      error={errors.DE_Intitule}
                      sx={{ borderColor: errors.DE_Intitule ? 'red' : '' }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={errors.DO_Devise}>
                  <InputLabel id="devise-label">Devise</InputLabel>
                  <Select
                    labelId="devise-label"
                    id="devise-select"
                    value={da.DO_Devise || ''}
                    name="DO_Devise"
                    onChange={handleChange}
                    label="Devise"
                    sx={{ borderColor: errors.DO_Devise ? 'red' : '' }}
                  >
                    {DO_Devise && DO_Devise.map((option, index) => (
                      <MenuItem key={`${option.D_Intitule}-${index}`} value={option.D_Intitule}>
                        {option.D_Intitule}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={CA_Num}
                  getOptionLabel={(option) => option.Affaire || ''}
                  value={CA_Num.find((option) => option.Affaire === da.Affaire) || null}
                  onChange={(event, value) => handleAutocompleteChange('Affaire', value?.Affaire || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Affaire"
                      placeholder="Tapez pour rechercher..."
                      error={errors.Affaire}
                      sx={{ borderColor: errors.Affaire ? 'red' : '' }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddDAForm;
