import { Box, TextField, Container, Button, Alert, Snackbar } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from './App';
import { useNavigate } from 'react-router-dom';


const Login = () =>{
    const {user, login, logout} = useContext(UserContext);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const [errorLogin, setErrorLogin] = useState(false);

    const handleClose = () => {
      setErrorLogin(false); 
    }
    

    const loginUser = async () => {
        const result = await fetch ('http://localhost:8080/api/v1/login', {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),

        });

        if(result.ok){
            const user = await result.json();
            login(user);  
            setErrorLogin(false);
            navigate ('/pocetna');       
            console.log("Ulogovan");
        } else {
            console.log(user);
            console.log(result);
            console.log("Greska prilikom logovanja");

            setErrorLogin(true);
        }
    }

    
    return <Container>
        <Box></Box>
        <Box 
            sx={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                alignContent: "center", 
                flexWrap: "wrap", 
                marginTop: 10
            }}
        >
            <TextField 
                id= "email" 
                label= "E-mail" 
                variant='outlined' 
                sx={{marginBottom: 2}}
                onChange={(e) =>{
                    const ld = {...loginData};
                    ld.email = e.target.value;
                    setLoginData(ld);
                }}
            />
            <TextField 
                id= "password" 
                label= "Password" 
                variant='outlined' 
                sx={{marginBottom: 1.5}}
                onChange={(e) => {
                    const ld = {...loginData};
                    ld.password = e.target.value;
                    setLoginData(ld);
                }}
            />
            <Button onClick={loginUser}>Log in</Button>
         </Box>
         <Snackbar open={errorLogin} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{width: '60%'}}>
            {"Pogresno korisnicko ime ili lozinka"}
          </Alert>
        </Snackbar>

    </Container>
        
}

export default Login;