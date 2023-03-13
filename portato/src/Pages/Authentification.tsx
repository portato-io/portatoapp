import React, {ReactElement, FC} from "react";
import {Box, Typography, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Authentification: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography> This is Authentification</Typography>
        </Box>     
        
    );
};

export default Authentification;
