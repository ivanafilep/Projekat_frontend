import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [potvrdjenaLozinka, setPotvrdjenaLozinka] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Molimo vas unesite ";
  const [korisnickoImeError, setKorisnickoImeError] = useState("");
  const [lozinkaError, setLozinkaError] = useState("");
  const [potvrdjenaLozinkaError, setPotvrdjenaLozinkaError] = useState("");
  const [imeError, setImeError] = useState("");
  const [prezimeError, setPrezimeError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  

  const save = async () => {
    if (korisnickoIme === "" || lozinka === "" || potvrdjenaLozinka === "" || ime === "" || prezime === "" || email === "") {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_student = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka, 
      potvrdjenaLozinka: potvrdjenaLozinka,
      ime: ime,
      prezime: prezime,
      email: email,
    };

    const user = localStorage.getItem("user");
    if (user){
      const u = JSON.parse(user);
      let response = await fetch('http://localhost:8080/api/v1/ucenik', {
        method: "POST",
        headers: {
          "Authorization": u.token,
          "Accept": "application/json",
          "Content-Type": "application/json",

        },
        body: JSON.stringify(new_student),
      });

      console.log(response);
      if (response.ok) {
        let d = await response.json();
        console.log(JSON.stringify(d));
        alert("Uspesno ste dodali novog studenta");
        navigate('/studenti');
        
      } else {
        console.log("Dodavanje novog studenta nije uspelo");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{display: "flex", gap: "10px",flexDirection: "column", alignItems: "center", "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Korisnicko ime"
          placeholder="Korisnicko ime"
          helperText={korisnickoImeError}
          error={korisnickoImeError === "" ? false : true}
          onBlur={(e)=> {
            const value = e.target.value;
            setKorisnickoIme(value);
            if (!value) {
              setKorisnickoImeError(errorMessageTemplate + " korisnicko ime.");
          }}}
          onChange={(e) => {
            const value = e.target.value;
            setKorisnickoIme(value);
            if (!value) {
              setKorisnickoImeError(errorMessageTemplate + " korisnicko ime.");
            } else if (!/^[a-zA-Z]+$/.test(value)) {
              setKorisnickoImeError("Ne sme se uneti broj i razmak.");
            } else if (value.length < 2) {
              setKorisnickoImeError("Korisničko ime mora imati više od  karaktera");
            } else if (value.length > 15) {
              setKorisnickoImeError("Korisničko ime mora imati manje od 15 karaktera");
            }
            else {
              setKorisnickoImeError("");
            }
          }}
        />
         <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Lozinka"
          placeholder="Lozinka"
          helperText={lozinkaError}
          error={lozinkaError === "" ? false : true}
          onBlur={(e) => {
            const value = e.target.value;
            setLozinka(value);
            if (!value) {
              setLozinkaError(errorMessageTemplate + " lozinku.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setLozinka(value);
            if (!value) {
              setLozinkaError(errorMessageTemplate + "lozinku.");
            }  else if (value.length < 5) {
              setLozinkaError("Lozinka mora imati više od 5 karaktera/brojeva");
            } else {
              setLozinkaError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Potvrdjena lozinka"
          placeholder="Potvrdjena lozinka"
          helperText={potvrdjenaLozinkaError}
          error={potvrdjenaLozinkaError === "" ? false : true}
          onBlur={(e) => {
            const value = e.target.value;
            setPotvrdjenaLozinka(value);
            if (!value) {
              setPotvrdjenaLozinkaError(errorMessageTemplate + "lozinku.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setPotvrdjenaLozinka(value);
            if (!value) {
              setPotvrdjenaLozinkaError(errorMessageTemplate + " potvrdjenu lozinku.");
            } else if (value !== lozinka) {
              setPotvrdjenaLozinkaError("Potvrdite lozinku.");
            } else {
              setPotvrdjenaLozinkaError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-isbn-input"
          label="Ime"
          placeholder="Ime"
          error={imeError}
          helperText={imeError}
          onBlur={(e) => {
            const value = e.target.value;
            setIme(value);
            if (!value) {
              setImeError(errorMessageTemplate + "ime.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setIme(value);
            if(!value){   
              setImeError(errorMessageTemplate + "ime.");
            }  else if (!/^\D+$/.test(value)) {
              setImeError("Ne sme se uneti broj.");
            } else if (value.length < 2) {
              setImeError("Ime mora imati više od 2 karaktera");
            } else if (value.length > 30) {
              setImeError("Ime mora imati manje od 30 karaktera");
            } else {
              setImeError("");
            }
          }}
        />
         <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-prezime-input"
          label="Prezime"
          placeholder="Prezime"
          required
          error={prezimeError}
          helperText={prezimeError}
          onBlur={(e) => {
            const value = e.target.value;
            setPrezime(value);
            if (!value) {
              setPrezimeError(errorMessageTemplate + "prezime.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setPrezime(value);
            if (!value) {
              setPrezimeError(errorMessageTemplate + "prezime.");
            } else if (!/^\D+$/.test(value)) {
              setPrezimeError("Ne sme se uneti broj.");
            } else if (value.length < 2) {
              setPrezimeError("Prezime mora imati više od 2 karaktera");
            } else if (value.length > 30) {
              setPrezimeError("Prezime mora imati manje od 30 karaktera");
            } else {
              setPrezimeError("");
            }
          }}
        />
         <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-email-input"
          label="E-mail"
          placeholder="E-mail"
          required
          error={emailError}
          helperText={emailError}
          onBlur={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) {
              setEmailError(errorMessageTemplate + "e-mail.");
          }}}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) {
              setEmailError(errorMessageTemplate + "e-mail.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              setEmailError("Unesite validnu e-mail adresu.");
            } else {
              setEmailError("");
            }
          }}
        />
        <Button
          onClick={save}
          disabled={
            korisnickoImeError|| imeError || prezimeError || emailError
          }
        >
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
};

export default StudentForm;