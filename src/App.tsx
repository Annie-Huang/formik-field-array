import React from 'react';
import { Home } from './Home';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';

import { theme } from './theme';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppBar position='fixed'>
          <Toolbar variant='dense'>
            <Typography variant='h6'>Field Array Formik</Typography>
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={10}>
            <Home />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
