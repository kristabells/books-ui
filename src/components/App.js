import React from 'react';
import SearchBar from "./SearchBar"
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from '../theme';

function App() {
    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <SearchBar/>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
