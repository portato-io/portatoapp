import React, {ReactElement, FC} from "react";
import { useNavigate } from 'react-router-dom';
import {Box, Typography, Button, Grid} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Home: FC<any> = (): ReactElement => {
    const navigate = useNavigate();
    return (

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: '100vh' }}
        >
            <Grid item>
                <Typography variant="h5" align="center" >
                    What do you want to do ?
                </Typography>
            </Grid>
            <Grid item sx={{textAlign: "center", width: "100%"}}>
                <Button variant="contained" color="primary" onClick={()=>{navigate("/send")
                }}>
                    Send
                </Button>
            </Grid>
            <Grid item sx={{textAlign: "center",width: "100%"}}>
                <Button variant="contained" color="secondary" onClick={()=>{navigate("/deliver")
                }}>
                    Deliver
                </Button>
            </Grid>
        
        </Grid>
        /*<Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                flexGrow: 1,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h3">Home</Typography>
                

            </Box>
            <Box sx={{  flexGrow: 1,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                
                <Button variant="contained"> Send </Button>
                <Button variant="contained"> Deliver </Button> 

            </Box>
        </Box> */    
        
    );
};

export default Home;
