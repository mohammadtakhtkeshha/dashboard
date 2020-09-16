import styled from "styled-components";
import {primary} from "components/partials/Colors";

export const styledTableCell =(theme) => ({
    head: {
        backgroundColor: primary,
        color: theme.palette.common.white,
        width:'50%'
    },
    body: {
        fontSize: 14,
    },
});

export const StyledNewTerm = styled.div`
    border:1px solid red;
`

export default {styledTableCell,StyledNewTerm};
