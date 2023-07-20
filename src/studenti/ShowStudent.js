import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const ShowStudent = ({korisnik, onDelete}) =>{
    const navigate = useNavigate();
    const {user, login, logout} = useContext(UserContext);

    const deleteStudent = async() =>{
        const user = localStorage.getItem("user");
        if (user){
            const u = JSON.parse(user);
            let response = await fetch(`http://localhost:8080/api/v1/ucenik/${korisnik.id}`,{
                method: 'DELETE',
                headers:{
                    "Authorization": u.token,
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
        });

        if (response.ok){
            let d = await response.json();
            console.log('uspesno obrisan student');
            onDelete(korisnik.id);
        } else {
            console.log('greska prilikom brisanja');
        }
      }
    };

    return <Grid item xs= {4}>
        <Card sx={{marginBottom: 3}} variant= 'outlined'>
            <CardHeader sx={{display: "flex", textAlign: "center", fontSize: "15px", fontWeight: "bold", color: "black",  backgroundColor: "#ce93d892"}} 
                    subheader = {korisnik.ime + " " + korisnik.prezime}/>
            <CardContent sx={{backgroundColor: "#e6f5fc"}}>
                <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    E-mail: {korisnik.email}</Typography>
                <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>ID korisnika: {korisnik.id}</Typography>
                <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>Korisnicko ime: {korisnik.korisnickoIme}</Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"center", backgroundColor: "rgba(0, 0, 0, 0.1)"}} >
            {user && user.role === "ROLE_ADMIN"  ?
                <>
                <IconButton aria-label="info" onClick={()=> navigate(`student/${korisnik.id}`)}>
                    <InfoIcon/>
                </IconButton>
                <IconButton aria-label="edit" onClick={() => navigate (`studentEdit/${korisnik.id}`)}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete" onClick={deleteStudent}>
                    <DeleteIcon/>
                </IconButton>
                </> : <></>}
            </CardActions>

        
        </Card>   
    </Grid>


};

export default ShowStudent;