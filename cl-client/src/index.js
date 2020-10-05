import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';


const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
          <CssBaseline/>
          <App />
      </React.StrictMode>
    </ThemeProvider>,
  document.getElementById('root')
);

