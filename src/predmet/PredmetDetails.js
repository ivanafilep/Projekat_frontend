import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid, Typography, Box } from "@mui/material";

const PredmetDetails = ()=>{
    const predmet = useLoaderData();

    return <Box sx={{display: "flex", justifyContent: "center"}}>
        <Card sx={{marginBottom: 3, width: "300px"}} variant="outlined">
            <CardHeader sx={{display: "flex", textAlign: "center", fontSize: "15px", fontWeight: "bold", color: "black",  backgroundColor: "#ce93d892"}}
                subheader= {predmet.nazivPredmeta}/>
            <CardContent sx={{backgroundColor: "#e6f5fc"}}>
                <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Nedeljni fond casova: {predmet.nedeljniFondCasova} </Typography>
                <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    ID predmeta: {predmet.ID}</Typography>
            </CardContent>
        </Card>
        </Box>
 
}

export default PredmetDetails;