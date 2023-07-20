import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PredmetForm = () => {
  const [nazivPredmeta, setNazivPredmeta] = useState("");
  const [nedeljniFondCasova, setNedeljniFondCasova] = useState("");
  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Molim Vas unesite ";
  const [nazivPredmetaError, setNazivPredmetaError] = useState("");
  const [nedeljniFondCasovaError, setNedeljniFondCasovaError] = useState("");

  const navigate = useNavigate();

  const save = async () => {
    if (nazivPredmeta === "" || nedeljniFondCasova === "") {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_predmet = {
      nazivPredmeta: nazivPredmeta,
      nedeljniFondCasova: nedeljniFondCasova
    };

    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      let response = await fetch('http://localhost:8080/api/v1/predmet', {
        method: "POST",
        headers: {
          "Authorization": u.token,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_predmet),
      });

      console.log(response);
      if (response.ok) {
        let d = await response.json();
        console.log(JSON.stringify(d));
        alert("Uspesno ste dodali novi predmet");
        navigate('/predmeti');
      } else {
        console.log("Dodavanje novog predmeta nije uspelo");
      }
    }   
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField
        sx={{ width: "100%" }}
        fullWidth
        required
        id="outlined-required"
        label="Naziv predmeta"
        placeholder="Naziv predmeta"
        helperText={nazivPredmetaError}
        error={nazivPredmetaError !== ""}
        onBlur={(e) => {
          const value = e.target.value.trim();
          setNazivPredmeta(value);
          if (value==="") {
            setNazivPredmetaError("Molim da unesete naziv predmeta.");
          } 
        }}
        onChange={(e) => {
          const value = e.target.value.trim();
          setNazivPredmeta(value);
          if (value==="") {
            setNazivPredmetaError("Molim da unesete naziv predmeta.");
          } 
          else if (!/^\D+$/.test(value)) {
            setNazivPredmetaError("Ne sme se uneti broj.");
          }
          else if (value.length < 2 || value.length > 20) {
            setNazivPredmetaError("Naziv predmeta mora imati između 2 i 20 karaktera.");
          }  else {
            setNazivPredmetaError("");
          }
        }}
      />

        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Nedeljni fond casova"
          placeholder="Nedeljni fond casova"
          helperText={nedeljniFondCasovaError}
          error={nedeljniFondCasovaError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setNedeljniFondCasova(value);
            if (value==="") {
              setNedeljniFondCasovaError("Molim da unesete fond časova.");
            }
          }}
          onChange={(e) => {
            const value = e.target.value.trim();
            setNedeljniFondCasova(value);
            const regex = /^\d+$/;
            if (!regex.test(value)) {
              setNedeljniFondCasovaError("Molim vas unesite broj.");
            } else if (value < 2 || value > 50) {
              setNedeljniFondCasovaError("Broj mora biti između 2 i 50.");
            } else {
              setNedeljniFondCasovaError("");
            }
          }}
        />

        <Button
          onClick={save}
          disabled={nazivPredmetaError || nedeljniFondCasovaError}
        >
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
};

export default PredmetForm;
