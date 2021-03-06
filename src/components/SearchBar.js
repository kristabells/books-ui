import React, {useContext} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography"
import {searchContext} from "./App"

const useStyles = makeStyles(theme => ({
    appBar: {
        paddingLeft: '26px',
        paddingRight: '26px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '400px',
        },
    }
}));

export default function SearchBar() {
    const classes = useStyles();
    const {setQuery} = useContext(searchContext);

    function handleChange(event) {
        const {target: {value}} = event;
        setQuery(value)
    }

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Find A Book
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        autoFocus
                        placeholder="Search Titles…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                        onChange={handleChange}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
