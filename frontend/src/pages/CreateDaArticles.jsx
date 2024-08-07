import React, { useState, useEffect } from 'react';
import {
  Box, Button, Container, TextField, Typography, Paper, IconButton, Grid
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const AddArticlesForm = () => {
  const [da, setDa] = useState(() => {
    const storedDa = localStorage.getItem('da');
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
    Demendeur: '',
  });
  const [articles, setArticles] = useState(() => {
    const storedArticles = localStorage.getItem('articles');
    return storedArticles ? JSON.parse(storedArticles) : [];
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState('');
  const [dialogValue, setDialogValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('da', JSON.stringify(da));
  }, [da]);

  const handleDaChange = (e) => {
    const { name, value } = e.target;
    setDa((prevDa) => ({
      ...prevDa,
      [name]: value,
    }));
  };

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleAddOrUpdateArticle = () => {
    if (editIndex === -1) {
      setArticles([...articles, article]);
    } else {
      const updatedArticles = articles.map((art, index) =>
        index === editIndex ? article : art
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
      Demendeur: '',
    });
  };

  const handleEditArticle = (index) => {
    setArticle(articles[index]);
    setEditIndex(index);
  };

  const handleDeleteArticle = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const requestData = { da, articles };
    try {
      const response = await axios.post('http://localhost:3000/api/da', requestData);
      alert('DA created successfully');
      console.log(response.data);
      localStorage.removeItem('da');
      localStorage.removeItem('articles');
      navigate('/');
    } catch (error) {
      console.error('Failed to create DA', error);
      alert('Failed to create DA');
    }
  };

  const handleOpenDialog = (field, value) => {
    setDialogField(field);
    setDialogValue(value);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = () => {
    setDa((prevDa) => ({
      ...prevDa,
      [dialogField]: dialogValue,
    }));
    setDialogOpen(false);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Add Articles
        </Typography>
        <Paper sx={{ padding: 3, marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            DA Information
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(da).map((key) => (
              <Grid item xs={4} key={key}>
                <Item onClick={() => handleOpenDialog(key, da[key])}>
                  {key}: {da[key]}
                </Item>
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Paper sx={{ padding: 3, marginBottom: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Article Detail</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Unit Price</StyledTableCell>
                  <StyledTableCell align="right">Enumere</StyledTableCell>
                  <StyledTableCell align="right">Quantity PL</StyledTableCell>
                  <StyledTableCell align="right">Tax Code</StyledTableCell>
                  <StyledTableCell align="right">Requester</StyledTableCell>
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
        <Paper sx={{ padding: 3 }}>
          <form onSubmit={handleConfirm}>
            <TextField
              label="Article Detail"
              name="articleDetail"
              value={article.articleDetail}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity"
              name="DL_Qte"
              type="number"
              value={article.DL_Qte}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Unit Price"
              name="DL_PrixUnitaire"
              type="number"
              value={article.DL_PrixUnitaire}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enumere"
              name="EU_Enumere"
              value={article.EU_Enumere}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity PL"
              name="DL_QtePL"
              type="number"
              value={article.DL_QtePL}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tax Code"
              name="DL_CodeTaxe1"
              value={article.DL_CodeTaxe1}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Requester"
              name="Demendeur"
              value={article.Demendeur}
              onChange={handleArticleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateArticle}
              sx={{ mr: 2 }}
            >
              {editIndex === -1 ? 'Ajouter' : 'Update'}
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Confirmer
            </Button>
          </form>
        </Paper>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit {dialogField}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name={dialogField}
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddArticlesForm;
