import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, Stack, ThemeProvider, Toolbar, 
  Typography, createTheme, Switch } from '@mui/material';
  import { ChevronLeft, Menu } from '@mui/icons-material';
  import { createContext, useEffect, useMemo, useState } from 'react';
  import { useLogin } from './login_logic';
  import { Outlet, useNavigate } from 'react-router-dom';
  
  const create_palette = (mode) => {
    let result = {};
    if (mode === 'light') {
      result = {
        mode: 'light',
        primary: {
          main: '#ce93d8',
        },
        text: {
          primary: '#000000',
          secondary: '#424242',
        },
      };
    } else {
      result = {
        mode: 'dark',
        
        primary:{
          main: '#808080',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8a8a8',
        },
        
        
      };
    }
    return { palette: result };
  };
  
  export const UserContext = createContext(null);
  
  function App() {
    const [otvoreno, setOtvoreno] = useState(false);
    const [mode, setMode] = useState('light');
    const theme = useMemo(() => createTheme(create_palette(mode)), [mode]);
    const [user, login, logout] = useLogin();
    const navigate = useNavigate();
    

  
    useEffect(() => {
      console.log(JSON.stringify(user));
      if (!user) {
        navigate('pocetna');
      }
    }, []);
    
  
    const handleThemeChange = () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, login, logout }}>
          <CssBaseline />
          <Stack direction="column">
            <AppBar sx={{ height: '80px', flexDirection: 'row', display: 'flex' }}>
              { user ?
              <>
              <Toolbar>
                <IconButton onClick={(e) => setOtvoreno(true)}>
                  <Menu sx={{color:'purple'}}/>
                </IconButton>
              </Toolbar>
              </> : <></>}

              <Typography variant="h5" sx={{ textAlign: 'center', flexGrow: 1, marginTop: '20px', color:'purple' }}>
                E-dnevnik
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 'auto', mr: 2 }}>
                <Switch checked={mode === 'dark'} onChange={handleThemeChange} />
                {user ? (
                  <Button color="inherit" sx={{ fontSize: '17px', color:'purple' }} onClick={logout}>
                    Log out
                  </Button>
                ) : (
                  <Button color="inherit" sx={{ fontSize: '17px' }} onClick={() => navigate('/login')}>
                    Log in
                  </Button>
                )}
              </Stack>
            </AppBar>
  
            <Drawer anchor="left" open={otvoreno} onClose={(e) => setOtvoreno(false)} sx={{
                    width: '150px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: '250px',
                    boxSizing: 'border-box',
                    right: '15px', 
                    },
                  }} >
              <Box>
                <IconButton>
                  <ChevronLeft sx={{color:'purple'}} onClick={(e) => setOtvoreno(false)} />
                </IconButton>
              </Box>
              <Divider/>
              <Stack direction="column" alignItems="flex-start" marginTop={2} marginLeft={5}>
              <Button sx={{ fontSize: '19px' }} onClick={() => {navigate('/pocetna'); setOtvoreno(false) }}>
                  POČETNA
                </Button>
                <Button sx={{ fontSize: '19px' }} onClick={() => {navigate('/predmeti'); setOtvoreno(false) }}>
                  Predmeti
                </Button>
                {user && user.role !== "ROLE_UCENIK" ?
                <>
                <Button sx={{ fontSize: '19px'}} onClick={() =>  {navigate('/studenti'); setOtvoreno(false) }}>
                  Učenici
                </Button>
                </> : <></>}
              </Stack>
            </Drawer>
          </Stack>
          <Box sx={{ padding: '100px 0px 1000px 0px',   backgroundColor: '#f5ecfdd4' }}>
            <Outlet />
          </Box>
        </UserContext.Provider>
      </ThemeProvider>
    );
  }
  
  export default App;
  