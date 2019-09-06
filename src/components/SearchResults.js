import React, {useContext, useEffect, useState} from "react"
import axios from 'axios'
import _ from 'lodash'
import {searchContext} from "./App"
import Book from "./Book"
import List from "@material-ui/core/List/List"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight"
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: '50px',
        marginRight: '50px'
    },
    paper: {
        marginTop: '50px',
        marginBottom: '50px',
        padding: '50px',
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    }
}));

export default function SearchResults() {
    const classes = useStyles();
    let [bookData, setBookData] = useState(null);
    let [page, setPage] = useState(0);
    const [maxPageLength] = useState(10);
    const {query} = useContext(searchContext);
    const debouncedGetBooks = _.debounce(getBooks, 500)
    let [isLoading, setIsLoading] = useState(false)

    /* eslint-disable-next-line */
    useEffect(() => {
        setPage(0);
    }, [query]);

    /* eslint-disable-next-line */
    useEffect(() => {
        if (query !== '') {
            debouncedGetBooks()
        }
    }, [query, page]);

    async function getBooks() {
        setIsLoading(true)
        const response = await axios.get(`/api/books?q=${query}&page=${page}&maxResults=${maxPageLength}`);
        setBookData(response.data);
        setIsLoading(false);
    }

    function getCurrentPageRange() {
        let range
        if (maxPageLength <= bookData.books.length) {
            range = `${page * maxPageLength + 1} - ${(page + 1) * maxPageLength}`
        } else {
            range = `${page * maxPageLength + 1} - ${bookData.totalItems}`
        }
        return range
    }

    // note: total results are changing during pagination - must be a side effect of google books API...look into this.
    function getFormattedTotalCount() {
        return bookData.totalItems.toLocaleString()
    }

    function handlePageBack() {
        setPage(page - 1)
    }

    function handlePageNext() {
        setPage(page + 1)
    }
    
    return (
        <main  className={classes.layout}>
            {query &&
            <Paper className={classes.paper}>
                {isLoading && <Typography variant='h6' className={classes.italic}>Searching...</Typography>}

                {bookData && bookData.totalItems > 0 &&
                <div>
                    <Typography variant='h6' className={classes.bold}>Displaying
                        results {getCurrentPageRange()} of {getFormattedTotalCount()}</Typography>
                    <IconButton
                        onClick={handlePageBack}
                        disabled={page === 0}
                        aria-label="previous page">
                        <KeyboardArrowLeft/>
                    </IconButton>
                    <IconButton
                        onClick={handlePageNext}
                        disabled={page >= Math.ceil(bookData.totalItems / 10) - 1}
                        aria-label="next page"
                    >
                        <KeyboardArrowRight/>
                    </IconButton>
                    <List>
                        {bookData.books.map((book, index, books) => {
                            return (
                                <div key={book.id}>
                                    <Book book={book}/>
                                    {index !== books.length - 1 && <Divider variant="inset" component="li"/>}
                                </div>
                            )
                        })}
                    </List>
                </div>
                }

                {bookData && bookData.totalItems === 0 &&
                <Typography variant='h6'>No search results</Typography>}
            </Paper>
            }
        </main>
    );

}