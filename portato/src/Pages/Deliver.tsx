import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

const Deliver: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h3">Deliver</Typography>
        </Box>
    );
};

export default Deliver;
