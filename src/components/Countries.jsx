import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";

export default function Countries(){
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#cfe8fc', height: '59vh'}}></Box>
            </Container>
        </React.Fragment>
    )
}