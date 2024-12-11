import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

export default function Countries(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#cfe8fc', height: '59vh'}}>
                <Container sx={{ height: '30vh', border: 'dashed',  textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Question
                    </Container>
                    <Grid container spacing={{md: 0}} columns={{md: 4}} sx={{border: 'dashed'}}>
                        <Grid size={{lg: 6}} sx={{height: '70px'}}>
                            <Item>size=8</Item>
                        </Grid>
                        <Grid sx={{height: '70px'}} size={{lg: 6}}>
                            <Item>size=4</Item>
                        </Grid>
                        <Grid size={{lg: 6}} sx={{height: '70px'}}>
                            <Item>size=4</Item>
                        </Grid>
                        <Grid size={{lg: 6}} sx={{height: '70px'}}>
                            <Item>size=8</Item>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}