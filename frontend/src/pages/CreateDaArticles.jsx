import React, { useState, useEffect } from 'react';
import {
  Box, Button, Container, TextField, Typography, Paper, IconButton, Grid, CircularProgress, FormControl, InputLabel, Select, MenuItem, Autocomplete
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDO_Devise, fetchTaxe, fetchAllEU_Enumere, fetchArticlesDemander } from '../redux/da/daSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AddArticlesForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from Redux store
  const { DO_Devise, DL_Taxe1, EU_Enumere, articlesDemander } = useSelector(state => state.da);

  const [da, setDaState] = useState(() => {
    const storedDa = localStorage.getItem('da');
    console.log('Initial DA from localStorage:', storedDa);  // Log initial DA state
    return storedDa
      ? JSON.parse(storedDa)
      : {
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
        COMMENTAIRES: '',
      };
  });

  const [article, setArticle] = useState({
    articleDetail: '',
    DL_Qte: '',
    DL_PrixUnitaire: '',
    EU_Enumere: '',
    DL_QtePL: '',
    DL_CodeTaxe1: '',
  });

  const [articles, setArticles] = useState(() => {
    const storedArticles = localStorage.getItem('articles');
    console.log('Initial Articles from localStorage:', storedArticles);  // Log initial Articles state
    return storedArticles ? JSON.parse(storedArticles) : [];
  });

  const [editIndex, setEditIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('Fetching data with dispatch');
    dispatch(fetchDO_Devise());
    dispatch(fetchTaxe());
    dispatch(fetchAllEU_Enumere());
    dispatch(fetchArticlesDemander());
  }, [dispatch]);

  useEffect(() => {
    console.log('Articles updated:', articles);
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    console.log('DA updated:', da);
    localStorage.setItem('da', JSON.stringify(da));
  }, [da]);

  const handleDaChange = (e) => {
    const { name, value } = e.target;
    console.log(`DA field changed: ${name} = ${value}`);
    setDaState((prevDa) => ({
      ...prevDa,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Article field changed: ${name} = ${value}`);
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  const handleAddOrUpdateArticle = () => {
    console.log('Adding or updating article:', article);
    if (!validateArticle()) {
      console.log('Article validation failed');
      return;
    }

    const articleWithDetails = {
      articleDetail: article.articleDetail,
      DL_Qte: parseFloat(article.DL_Qte).toFixed(6),
      DL_PrixUnitaire: parseFloat(article.DL_PrixUnitaire).toFixed(6),
      EU_Enumere: article.EU_Enumere,
      DL_QtePL: parseFloat(article.DL_QtePL).toFixed(6),
      DL_CodeTaxe1: article.DL_CodeTaxe1,
    };

    if (editIndex === -1) {
      setArticles([...articles, articleWithDetails]);
    } else {
      const updatedArticles = articles.map((art, index) =>
        index === editIndex ? articleWithDetails : art
      );
      setArticles(updatedArticles);
      setEditIndex(-1);
    }

    setArticle({
      articleDetail: '',
      DL_Qte: '',
      DL_PrixUnitaire: '',
      EU_Enumere: '',
      DL_QtePL: '',
      DL_CodeTaxe1: '',
    });

    localStorage.setItem('articles', JSON.stringify([...articles, articleWithDetails]));
  };

  const validateArticle = () => {
    const newErrors = {
      articleDetail: !article.articleDetail,
      DL_Qte: !article.DL_Qte,
      DL_PrixUnitaire: !article.DL_PrixUnitaire,
      EU_Enumere: !article.EU_Enumere,
      DL_QtePL: !article.DL_QtePL,
      DL_CodeTaxe1: !article.DL_CodeTaxe1,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);

    if (hasError) {
      console.log('Article validation errors:', newErrors);
      toast.error('Veuillez remplir tous les champs obligatoires *');
      return false;
    }

    return true;
  };

  const handleEditArticle = (index) => {
    console.log('Editing article at index:', index);
    setArticle(articles[index]);
    setEditIndex(index);
  };

  const handleDeleteArticle = (index) => {
    console.log('Deleting article at index:', index);
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !da.fullName,
      DO_Tiers: !da.DO_Tiers,
      E_Intitule: !da.E_Intitule,
      DE_Intitule: !da.DE_Intitule,
      DO_Devise: !da.DO_Devise,
      DO_DateLivr: !da.DO_DateLivr || dayjs(da.DO_DateLivr).isBefore(dayjs(), 'day'),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);

    if (hasError) {
      console.log('Form validation errors:', newErrors);
      toast.error('Veuillez remplir tous les champs obligatoires *');
      return false;
    }

    return true;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log('Confirming DA creation with data:', { da, articles });
    if (validateForm()) {
      const requestData = { da, articles };
      try {
        const response = await axios.post('http://localhost:3000/api/da', requestData);
        console.log('DA creation success:', response.data);
        toast.success('DA créé avec succès');
        localStorage.removeItem('da');
        localStorage.removeItem('articles');
        navigate('/');
      } catch (error) {
        console.error('Failed to create DA:', error);
        toast.error('Échec de la création de la DA');
      }
    }
  };

  const keyLabels = {
    fullName: 'Acheteur',
    DO_Tiers: 'Fournisseur',
    DO_DateLivr: 'Date de Livraison',
    DO_Devise: 'Devise',
    DE_Intitule: 'Dépôt',
    E_Intitule: 'Expédition',
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Informations de la DA
        </Typography>
        <Paper sx={{ padding: 3, marginBottom: 2 }}>
          <Grid container spacing={2}>
            {Object.keys(da)
              .filter((key) => keyLabels[key]) // Include only the keys that have custom labels
              .map((key) => (
                <Grid item xs={4} key={key}>
                  <Typography>
                    <strong>{keyLabels[key]}:</strong>{' '}
                    <span style={{ color: '#e19c23' }}>
                      {key === 'DO_DateLivr'
                        ? dayjs(da[key]).format('YYYY-MM-DD') // Format date
                        : key === 'DO_Devise'
                          ? da[key].split(')').pop().trim() // Extract text after the last ')'
                          : da[key]}
                    </span>
                  </Typography>
                </Grid>
              ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/add-da')}
            sx={{ mt: 2 }}
          >
            Précédent
          </Button>
        </Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Les articles ajouter
        </Typography>
        <Paper sx={{ padding: 3, marginBottom: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Article Detail</StyledTableCell>
                  <StyledTableCell align="right">Quantité</StyledTableCell>
                  <StyledTableCell align="right">Prix Unitaire</StyledTableCell>
                  <StyledTableCell align="right">Enumere</StyledTableCell>
                  <StyledTableCell align="right">Quantité PL</StyledTableCell>
                  <StyledTableCell align="right">Code Taxe</StyledTableCell>
                  <StyledTableCell align="right">Demendeur</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((art, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {art.articleDetail}
                    </StyledTableCell>
                    <StyledTableCell align="right">{art.DL_Qte}</StyledTableCell>
                    <StyledTableCell align="right">{art.DL_PrixUnitaire}</StyledTableCell>
                    <StyledTableCell align="right">{art.EU_Enumere}</StyledTableCell>
                    <StyledTableCell align="right">{art.DL_QtePL}</StyledTableCell>
                    <StyledTableCell align="right">{art.DL_CodeTaxe1}</StyledTableCell>
                    <StyledTableCell align="right">{art.Demendeur}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditArticle(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteArticle(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Ajouter des Articles
        </Typography>
        <Paper sx={{ padding: 3 }}>
          <form onSubmit={handleConfirm}>
            <Autocomplete
              options={articlesDemander}
              getOptionLabel={(option) => option.articlesDemander || ''}
              value={articlesDemander.find((option) => option.articlesDemander === article.articlesDemander) || null}
              onChange={(event, value) => handleArticleChange({ target: { name: 'articlesDemander', value: value?.articlesDemander || '' } })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Les articles demander"
                  placeholder="Tapez pour rechercher..."
                  error={errors.articleDetail}
                  sx={{ borderColor: errors.articlesDemander ? 'red' : '' }}
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
            <Grid container spacing={2} sx={{ py: 0 }}>
              <Grid item xs={4}>
                <TextField
                  label="Quantité"
                  name="DL_Qte"
                  type="number"
                  value={article.DL_Qte}
                  onChange={handleArticleChange}
                  fullWidth
                  error={errors.DL_Qte}
                  sx={{ borderColor: errors.DL_Qte ? 'red' : '' }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Prix Unitaire"
                  name="DL_PrixUnitaire"
                  type="number"
                  value={article.DL_PrixUnitaire}
                  onChange={handleArticleChange}
                  fullWidth
                  error={errors.DL_PrixUnitaire}
                  sx={{ borderColor: errors.DL_PrixUnitaire ? 'red' : '' }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={errors.EU_Enumere}>
                  <InputLabel id="EU_Enumere-label">Enumere</InputLabel>
                  <Select
                    labelId="EU_Enumere"
                    id="EU_Enumere-select"
                    value={article.EU_Enumere}
                    name="EU_Enumere"
                    onChange={handleArticleChange}
                    label="Enumere"
                    sx={{ borderColor: errors.EU_Enumere ? 'red' : '' }}
                  >
                    {EU_Enumere.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Quantité PL"
                  name="DL_QtePL"
                  type="number"
                  value={article.DL_QtePL}
                  onChange={handleArticleChange}
                  fullWidth
                  error={errors.DL_QtePL}
                  sx={{ borderColor: errors.DL_QtePL ? 'red' : '' }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={errors.DL_CodeTaxe1}>
                  <InputLabel id="DL_CodeTaxe1-label">Code Taxe</InputLabel>
                  <Select
                    labelId="DL_CodeTaxe1"
                    id="DL_CodeTaxe1-select"
                    value={article.DL_CodeTaxe1}
                    name="DL_CodeTaxe1"
                    onChange={handleArticleChange}
                    label="Code Taxe"
                    sx={{ borderColor: errors.DL_CodeTaxe1 ? 'red' : '' }}
                  >
                    {DL_Taxe1.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateArticle}
              sx={{ mr: 2, mt: 2 }}
            >
              {editIndex === -1 ? 'Ajouter' : 'Mettre à jour'}
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Confirmer
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddArticlesForm;
