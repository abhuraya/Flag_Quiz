import * as React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import "./nav.css";

export default function BasicMenu() {

  return (
    <Container sx={{display: 'flex', alignItems: 'row', textAlign: 'center', justifyContent: 'space-around', minWidth: 100, minHeight: 100}}>
      <Typography sx={{display: 'flex', alignItems: 'row', textAlign: 'center'}}>
        <h4 class="time">Time</h4>
        <h4 class="applesauce">Progress Bar</h4>
        <h4 class="score">Score</h4>
        <h4 class="link">links</h4>
      </Typography>
    </Container>
  );
}
