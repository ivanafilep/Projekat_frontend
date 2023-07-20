import { useNavigate } from "react-router-dom";
import ShowStudent from "./ShowStudent";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { UserContext } from "../App";



const ShowStudenti = () => {
    const [studenti, setStudenti] = useState([]);
    const [filteredStudenti, setFilteredStudenti] = useState([]);
    const [search, setSearch] = useState('');
    const {user, login, logout} = useContext(UserContext);

    const navigate = useNavigate();


    useEffect(() => {
      if (search === '') {
         setStudenti(studenti);
         setFilteredStudenti(studenti);
      } else {
        const filtered = studenti.filter((s) => s.ime.toLowerCase().includes(search.toLowerCase()));
        setFilteredStudenti(filtered);
        console.log(filteredStudenti);
      }
       
    }, [search]);


    useEffect(() => {
        const getStudenti = async () => {
          const user = localStorage.getItem("user");
          if (user) {
            const u = JSON.parse(user);
            let result = await fetch('http://localhost:8080/api/v1/ucenik', {
              headers: {
                "Authorization": u.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
            });
            console.log(result);
            if (result.ok) {
              let r = await result.json();
              setFilteredStudenti(r);
              setStudenti(r);
            }
          }
        };
        getStudenti();
      }, []);

      const handleDelete = (korisnikId) =>{
        const updatedStudenti = studenti.filter((s)=> s.id != korisnikId);
        setStudenti(updatedStudenti);
        setFilteredStudenti(updatedStudenti);
      }

      return (
        <Container>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px', padding: '20px', height: '40px'}}>
            {user && user.role === "ROLE_ADMIN" || user.role === "ROLE_NASTAVNIK" || user.role === "ROLE_RODITELJ" ?
           <>
            <Box
              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', padding: '20px', boxSizing: 'border-box'}}>
              <TextField sx={{ flex: 1, borderRadius: '4px 0px 0px 4px', width: '100%', backgroundColor: 'whitesmoke' }}
                type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            </Box>
            </> : <></>}
          </Box>
          <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(265px,1fr))', gridAutoRows: '220px', gridGap: '100px',
              margin: '30px'}}>
              {filteredStudenti.map((s) => (
              <ShowStudent key={s.id} korisnik={s} onDelete={handleDelete} />
            ))}
          </Grid>
          {user && user.role === "ROLE_ADMIN"  ?
           <>
          <Box sx={{ position: 'static', marginTop:'65px', marginBottom:'30px', marginLeft: '30px' }}>
            <Button variant="outlined" onClick={() => navigate('new_student')} sx={{ color: 'black', backgroundColor: '#ce93d892' }}>
              Dodaj novog učenika</Button>
          </Box>
          </> : <></>}
        </Container>
      );
      


};

export default ShowStudenti;
