import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333D51',
        },
        secondary: {
            main: '#D3AC2B',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#CBD0D8',
        },
        navyBlue: '#333D51',
        lightBlue: '#CBD0D8',
        gold: '#D3AC2B',
        white: '#F4F3EA',
    },
});

export default theme;