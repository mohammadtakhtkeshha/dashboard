import {Box} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {white} from "assets/js/library/abstracts/colors"

export const styledTabs = () =>({
    root:{
    }
})

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const StyledPaper = styled.div`
             background-color:${white[0]};
             box-shadow: 0px 2px 4px 0px #999f9d;
             border-radius: 5px;
             margin:1rem 0;
`



