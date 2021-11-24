import './App.css';
import Routes from './routes/Routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RecoilRoot>
          <Routes/>
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
}

export default App;
