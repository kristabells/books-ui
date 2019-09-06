import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import {searchContext} from "./App"
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    highlightedText: {
        background: 'yellow'
    }
}));

export default function Book({book}) {
    const classes = useStyles();
    const query = useContext(searchContext);

    function highlight(text) {
        const startIndex = text
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase());
        const endIndex = startIndex + query.length;

        if (startIndex !== endIndex) {
            text = `${text.slice(0, endIndex)}</span>${text.slice(
                endIndex
            )}`;
            text = `${text.slice(
                0,
                startIndex
            )}<span class="highlightedText">${text.slice(startIndex)}`;
        }

        return text
    }

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={book.title} src={book.thumbnail}>
                        {!book.thumbnail && <LibraryBooksIcon/>}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<span dangerouslySetInnerHTML={{__html: highlight(book.title)}}/>}
                    secondary={book.authors &&
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Written by {book.authors.join(', ')}
                        </Typography>
                    </React.Fragment>
                    }
                />
            </ListItem>
        </>
    );
}
