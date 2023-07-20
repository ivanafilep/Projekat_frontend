import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { produce } from "immer";

const EditPredmet = () => {
  const podatak = useLoaderData();
  const navigate = useNavigate();
  const [predmet, setPredmet] = useState(podatak);

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Molim Vas unesite ";
  const [predmetError, setPredmetError]= useState("");


  const promeniPredmet = (e) => {
    setPredmet(produce((draft) => {
      draft[e.target.name] = e.target.value;
    }));

    setPredmetError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
  }));

  if (e.target.name === "nazivPredmeta") {
    const value = e.target.value;

    if (e.target.name === "nazivPredmeta") {
      const value = e.target.value.trim();
      if (value==="") {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Molim vas unesite naziv predmeta.",
        }));
      }
      else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Ne sme se uneti broj, molim vas unesite naziv predmeta.",
        }));
      }
      else if (value.length < 2 || value.length > 20) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Naziv predmeta mora biti između 2 i 20 karaktera.",
        }));
      } 
      else {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "", 
        }));
      }
    }
    
  }
  

if (e.target.name === "nedeljniFondCasova") {
  const value = e.target.value;
  if (value==="") {
    setPredmetError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "Molim vas unesite fond časova.",
    }));
  }
  else if (value <= 0 || value > 50) {
    setPredmetError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "Nedeljni fond casova ne sme biti preko 50.",
    }));
  } else if(isNaN(value)){
    setPredmetError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "Ne sme se unositi tekst, molim vas unesite broj do 50.",
    }));
  }
}

};

    const update = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let response = await fetch(`http://localhost:8080/api/v1/predmet/${predmet.ID}`,
          {
            method: "PUT",
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(predmet)
          }
        );

        console.log(response);
        if (response.ok) {
          let d = await response.json();
          console.log(JSON.stringify(d));
          alert("Uspesno ste izmenili predmet");
          navigate("/predmeti");
        } else {
          console.log("Izmena predmeta nije uspela");
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
          "& .MuiTextField-root": { m: 1, width: "100%" }
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
          value={predmet.nazivPredmeta}
          placeholder="Naziv predmeta"
          name="nazivPredmeta"
          helperText={predmetError.nazivPredmeta}
          error={Boolean(predmetError.nazivPredmeta)}
          onChange={promeniPredmet}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          value={predmet.nedeljniFondCasova}
          label="Nedeljni fond casova"
          placeholder="Nedeljni fond casova"
          name="nedeljniFondCasova"
          helperText={predmetError.nedeljniFondCasova}
          error={Boolean(predmetError.nedeljniFondCasova)}
          onChange={promeniPredmet}
        />
        <Button
          onClick={update}
          disabled={Object.values(predmetError).some((error) => error !== "")}>
        
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
};

export default EditPredmet;
