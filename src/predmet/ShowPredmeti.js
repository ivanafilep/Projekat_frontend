import { useNavigate } from "react-router-dom";
import ShowPredmet from './ShowPredmet';
import { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { UserContext } from "../App";


const ShowPredmeti = () => {

  const [predmeti, setPredmeti] = useState([]);
  const [filteredPredmeti, setFilteredPredmeti] = useState([]);
  const [search, setSearch] = useState('');
  const {user, login, logout} = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (search === '') {
      setPredmeti(predmeti);
      setFilteredPredmeti(predmeti);
    } else {
      const filtered = predmeti.filter((p) => p.nazivPredmeta.toLowerCase().includes(search.toLowerCase()));
      setFilteredPredmeti(filtered);
      console.log(filteredPredmeti);
    }
  
   
  }, [search]);

  useEffect(() => {
    const getPredmeti = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let result = await fetch ('http://localhost:8080/api/v1/predmet', {
          headers: {
            "Authorization": u.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log(result);
        if (result.ok) {
          let r = await result.json();
          setFilteredPredmeti(r);
          setPredmeti(r);
        }
      }
    };
    getPredmeti();
  }, []);

  
  const handleDelete = (predmetId) =>{
    const updatedPredmeti = predmeti.filter((p) => p.ID != predmetId);
    setPredmeti(updatedPredmeti);
    setFilteredPredmeti(updatedPredmeti);
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px', padding: '20px', height: '40px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', padding: '20px', boxSizing: 'border-box' }}>
          <TextField
            sx={{ flex: 1, borderRadius: '4px 0px 0px 4px', width: '100%', backgroundColor: 'whitesmoke' }}
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
      <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(265px,1fr))', gridAutoRows: '190px', gridGap: '70px', marginTop:'50px' }}>
        {filteredPredmeti.map((p) => (
          <ShowPredmet key={p.ID} predmet={p} onDelete={handleDelete}/>
        ))}
      </Grid>
      {user && user.role === "ROLE_ADMIN"  ?
      <>
      <Box sx={{ position: 'static', bottom: '20px', left: '20px', marginTop:'65px', marginBottom:'30px' }}>
        <Button variant="outlined" onClick={() => navigate("new_predmet")} sx={{ color: 'black', backgroundColor: '#ce93d892' }}>Dodaj novi predmet</Button>
      </Box> 
      </> : <></>}
    </Container>
  );
  
};

export default ShowPredmeti;

