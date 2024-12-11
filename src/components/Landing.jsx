import { Box } from '@mui/material';
import * as React from 'react';
import MainPage from './MainPage';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import Countries from './Countries';
import { Link } from 'react-router-dom';

let us = {
    name: 'United States of America',
    alt: 'America'
}

function Landing(){

    return (
        <div>
            <Typography class="text-center" sx={{border: 'dashed', textAlign: 'center'}}>
                <br />
                <br />
                <br />
                <br />
                <h1 class="display-4">
                    This is a Flag Quiz
                </h1>
                <br />
                <br />
                <br />
                <h3 class="h4">
                    Please select one of the following
                </h3>
                <br />
                <br />
                <br />
                <br />
            </Typography>

         <Box component="section" sx={{ p: 2, border: '1px dashed', height: 100, display: 'flex', justifyContent: 'space-around' }}>
         <Link 
         to={`/Flags`}
         >
            <Button variant='contained' sx={{ width: 125}}>Flags</Button>
         </Link>
         <Link
         to={`/Countries`}>
            <Button variant='contained' sx={{ width: 125}}>Countries</Button>
         </Link>
         </Box>
        </div>
    );
}

export default Landing;