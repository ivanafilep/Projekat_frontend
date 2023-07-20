import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const EditStudent = () =>{

  const podatak = useLoaderData();
  const navigate = useNavigate();
  const [korisnik, setKorisnik] = useState(podatak);

  const [globalError, setGlobalError] = useState(false);
  const [korisnikError, setKorisnikError] = useState("")


  const promeniStudent = (e) => {
    setKorisnik(produce((draft) => {
      draft[e.target.name] = e.target.value;
    }));

    setKorisnikError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
  }));
  
  if (e.target.name === "ime") {
    if (!e.target.value) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Molimo vas unesite ime",
      }));
    } else if (!/^\D+$/.test(e.target.value)) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Ime ne sme sadržati broj.",
      }));
    } else if (e.target.value.length < 2) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Ime mora imati više od 2 karaktera.",
      }));
    } else if (e.target.value.length > 30) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Ime mora imati manje od 30 karaktera",
      }));
    } else {
      setKorisnikError("");
    }
  }

  if (e.target.name === "prezime") {
    if (!e.target.value) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Molimo Vas unesite prezime",
      }));
    } else if (!/^\D+$/.test(e.target.value)) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Prezime ne sme sadržati broj.",
      }));
    } else if (e.target.value.length < 2) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Prezime mora imati više od 2 karaktera.",
      }));
    } else if (e.target.value.length > 30) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Prezime mora imati manje od 30 karaktera",
      }));
    } else {
      setKorisnikError("");
    }
  }


  if (e.target.name === "korisnickoIme") {
    if (!e.target.value) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Molimo Vas unesite korisničko ime",
      }));
    } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Korisničko ime ne sme sadržati broj i razmak.",
      }));
    } else if (e.target.value.length < 2) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Korisničko ime mora imati više od 2 karaktera.",
      }));
    } else if (e.target.value.length > 15) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Korisničko ime mora imati manje od 15 karaktera",
      }));
    } else {
      setKorisnikError("");
    }
  }

  if (e.target.name === "email") {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!e.target.value) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Molimo Vas unesite e-mail adresu.",
      }));
    } else if (!emailRegex.test(e.target.value)) {
      setKorisnikError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "Molimo unesite pravilnu e-mail adresu.",
      }));
    }else {
      setKorisnikError("");
    }
  }


if (e.target.name === "lozinka") {
  if (e.target.value.length < 2) {
    setKorisnikError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Lozinka mora imati minimum 2 karaktera",
      }));
  }
}

if (e.target.name === "potvrdjenaLozinka") {
  if (e.target.value.length < 2 || e.target.value !== korisnik.lozinka) {
    setKorisnikError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Molim Vas unesite lozinku sa minimalno 2 karaktera, potvrdjena lozinka se mora poklapati sa lozinkom",
      }));
  }
}

};



  const update = async () =>{
    const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let response = await fetch(`http://localhost:8080/api/v1/ucenik/${korisnik.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(korisnik)
          }
        );

        console.log(response);
        if (response.ok) {
          let d = await response.json();
          console.log(JSON.stringify(d));
          alert("Uspesno ste izmenili studenta");
          navigate("/studenti");
        } else {
          console.log("Izmena studenta nije uspela");
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
          value={korisnik.korisnickoIme}
          placeholder="Korisnicko ime"
          name="korisnickoIme"
          helperText={korisnikError.korisnickoIme}
          error={Boolean(korisnikError.korisnickoIme)}
          onChange={promeniStudent}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Lozinka"
          placeholder="Lozinka"
          name="lozinka"
          helperText={korisnikError.lozinka}
          error={Boolean(korisnikError.lozinka)}
          onChange={promeniStudent}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Potvrdjena lozinka"
          value={korisnik.potvrdjenaLozinka}
          placeholder="Potvrdjena lozinka"
          name="potvrdjenaLozinka"
          helperText={korisnikError.potvrdjenaLozinka}
          error={Boolean(korisnikError.potvrdjenaLozinka)}
          onChange={ promeniStudent}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-ime-input"
          label="Ime"
          value={korisnik.ime}
          placeholder="Ime"
          name="ime"
          error={Boolean(korisnikError.ime)}
          helperText={korisnikError.ime}
          onChange={promeniStudent}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-prezime-input"
          label="Prezime"
          value={korisnik.prezime}
          placeholder="Prezime"
          name="prezime"
          required
          error={Boolean(korisnikError.prezime)}
          helperText={korisnikError.prezime}
          onChange={promeniStudent}
        />
         <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-email-input"
          label="E-mail"
          value={korisnik.email}
          placeholder="E-mail"
          name="email"
          required
          error={Boolean(korisnikError.email)}
          helperText={korisnikError.email}
          onChange={promeniStudent}
        />
        <Button
          onClick={update}
          disabled={Object.values(korisnikError).some((error) => error !== "")}>
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );

}

export default EditStudent;