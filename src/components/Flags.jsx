import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Afghanistan from '../assets/Flags/Afghanistan.png'

export default function Flags(){

let countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovnia', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Cote D'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czehia', "Democratic People's Republic of Korea", 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equiatoral Guniea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Georgia', 'Germany', 'Ghana', 'Ginnea-Bissau', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Haiti', 'Honduras','Hunngary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kygystan', "Lao People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lichtenstein', 'Lituaninia', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Maratius', 'Marshall Islands', 'Mexico', 'Micronesia', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Korea', 'Republic of Moldova', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevus', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Sapin', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Tajikistan', 'Thailand', 'The Gambia', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom of Great Britain and Northern Island', 'United Republic of Tanzania', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanatu', 'Venezuela', 'Yemen', 'Zambia', 'Zimbabwe'];
console.log(countries[Math.floor(Math.random() * countries.length)]);


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
                    <Container sx={{ height: '30vh', border: 'dashed', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={Afghanistan} alt="a flag" />
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
