import React, {useState} from 'react';
import SearchBar from "./SearchBar"
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from '../theme';
import SearchResults from "./SearchResults"

export const searchContext = React.createContext(null);

function App() {
    const [query, setQuery] = useState('');

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <searchContext.Provider value={{query, setQuery}}>
                    <SearchBar/>
                    <SearchResults/>
                </searchContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
