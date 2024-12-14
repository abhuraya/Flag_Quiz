import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import "./nav.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BasicMenu() {

  return (
    <Container sx={{display: 'flex', alignItems: 'row', textAlign: 'center', justifyContent: 'space-around', minWidth: 100, minHeight: 100}}>
      <Typography sx={{display: 'flex', alignItems: 'row', textAlign: 'center'}}>
        <h4 class="time">Time</h4>
        <h4 class="applesauce">Progress Bar</h4>
        <h4 class="score">0</h4>
        <Link
        to={`/`}>
            <Button class="home btn btn-secondary btn-lg" sx={{border: 'dashed'}}><h4>Home</h4></Button>
        </Link>
      </Typography>
    </Container>
  );
}
