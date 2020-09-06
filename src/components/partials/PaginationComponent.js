import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import {paginationStyle} from "assets/js/pagination";

import {Box} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/styles";
import UserContext from "../../contexts/UserContext";

const useStyles = makeStyles(paginationStyle);

function PaginationComponent({ onChange}) {
    const classes = useStyles();
    const userContext = useContext(UserContext);


    let onChangeHandler = (e, value) => {
        onChange(e, value);
    }

    return (
        <Box className={classes.pagination}>
            <Box className={classes.pagination}>
                <Pagination count={(userContext.totalPage)}
                            onChange={onChangeHandler}/>
            </Box>
        </Box>
    );
}

export default withNamespaces('users', 'translation')(PaginationComponent);
