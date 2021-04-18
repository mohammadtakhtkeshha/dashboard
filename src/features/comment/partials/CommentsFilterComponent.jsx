import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Typography, Grid, withStyles} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import {StyledAddButton, StyledBox} from "assets/js/App";
import {MarginTop1} from "assets/js/library/base/all";
import {filterByMethod, doFilterHandlerMethod} from "./CommentsFilterComponent.js";
import {styledExpansionPanelDetails,StyledCommentInput} from "assets/js/library/pages/comment/commentFilter";

const StyledExpansionPanelDetails = withStyles(styledExpansionPanelDetails)(ExpansionPanelDetails)

function CommentFilterComponent({t, commentStatus, unconfirmedComments, publishedComments, handlePagination,expandedFilter,setExpandedFilter}) {
    const [searchedComment, setSearchedComment] = useState({
        subject: "",
        author: ""
    });

    const filterBy = (e, key) => {
        filterByMethod(e, key, setSearchedComment)
    }

    const doFilterHandler = () => {
        doFilterHandlerMethod(commentStatus, searchedComment, unconfirmedComments, publishedComments, handlePagination);
    }

    const changeExpanding = (e,checked) => {
        setExpandedFilter(checked)
    }

    return (
        <StyledBox>
            <ExpansionPanel expanded={expandedFilter} onChange={changeExpanding}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content">
                    <Typography>{t('translation:filter')}</Typography>
                </ExpansionPanelSummary>
                <StyledExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={6}>
                                <StyledCommentInput  className="filter-subject" placeholder={t('translation:subject')}
                                             onChange={e => filterBy(e, 'subject')}/>
                            </Grid>
                            <Grid item xs={6} >
                                <StyledCommentInput className="filter-author" placeholder={t('translation:author')}
                                             onChange={e => filterBy(e, 'author')}/>
                            </Grid>
                        </Grid>
                    <MarginTop1>
                            <StyledAddButton onClick={doFilterHandler}>
                                {t('translation:do')}
                            </StyledAddButton>
                    </MarginTop1>
                </StyledExpansionPanelDetails>
            </ExpansionPanel>
        </StyledBox>
);
}

export default withNamespaces('translation,contents')(CommentFilterComponent);
