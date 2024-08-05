// src/pages/CreateDemandePage.jsx
import { useTheme } from "@emotion/react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createDemandeThunk, getArticlesBySelectionThunk } from "../redux/demandes/demandeSlice";

const CreateDemandePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { articles, loading } = useSelector((state) => state.demande);
  const [inputs, setInputs] = useState({
    AR_Ref: "",
    description: "",
    AR_Design: "",
    Qty: "",
  });

  const [searchKey, setSearchKey] = useState("");

  const handleCreateDemande = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(createDemandeThunk({ ...inputs, email: user.email })).unwrap();
      toast.success("Demande created successfully.");
      setInputs({
        AR_Ref: "",
        description: "",
        AR_Design: "",
        Qty: "",
      });
      navigate(`/demande/${response.data.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (event, value) => {
    setSearchKey(value);
    if (value) {
      dispatch(getArticlesBySelectionThunk(value));
    }
  };

  const handleArticleSelect = (event, value) => {
    if (value) {
      const [AR_Ref, AR_Design] = value.split(' - ');
      setInputs({ ...inputs, AR_Ref, AR_Design });
    } else {
      setInputs({ ...inputs, AR_Ref: '', AR_Design: '' });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "93vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        sx={{
          backgroundImage: "url(../../imageLEFT.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: "14px" }}>
            Create Demande
          </Typography>
          <Stack onSubmit={handleCreateDemande} component="form" gap={3}>
            <Autocomplete
              disablePortal
              id="article-select"
              options={articles || []}
              getOptionLabel={(option) => option}
              loading={loading}
              onInputChange={handleSearchChange}
              onChange={handleArticleSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Article"
                  placeholder="Type to search..."
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
            <TextField
              required
              fullWidth
              id="Qty"
              label="Quantity"
              name="Qty"
              autoComplete="off"
              value={inputs.Qty}
              onChange={(e) => setInputs({ ...inputs, Qty: e.target.value })}
            />
            <TextField
              required
              fullWidth
              id="desc"
              label="Description"
              name="desc"
              autoComplete="off"
              multiline
              rows={4}
              value={inputs.desc}
              onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
            />
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{
              mb: 3,
              "&.Mui-disabled": {
                backgroundColor: theme.palette.primary.main,
              },
            }}>
              {loading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Create Demande"}
            </Button>
          </Stack>
        </Container>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        sx={{
          backgroundImage: "url(../../imageRight.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default CreateDemandePage;
