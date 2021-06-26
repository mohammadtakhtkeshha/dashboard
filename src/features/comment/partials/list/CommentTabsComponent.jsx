import React from "react";
import {withNamespaces} from "react-i18next";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import {
    TabPanel,
    a11yProps,
    StyledPaper,
} from "assets/js/comment/commentTabs";
import CommentTableComponent from "./partials/table/CommentTableComponent.jsx";
import {handleChangeMethod} from "./CommentTabsComponent.js";


function CommentDashboardComponent({t, chunkPublishedComments, chunkUnconfirmedComments, publishPage, unconfirmPage, setUnconfirmPage, setPublishPage, selectedCheckBoxes, setSelectedCheckBoxes, unconfirmedComments, setCommentStatus, commentStatus, handlePagination, publishedComments, totalUnconfirmPage, totalPublishPage}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        handleChangeMethod(setValue, newValue, setCommentStatus)
    };

    return (
        <StyledPaper>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={t('comments:publishedComments')} {...a11yProps(0)} />
                <Tab label={`${t('comments:unconfirmedComments')}(${unconfirmedComments.length})`}  {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CommentTableComponent setSelectedCheckBoxes={setSelectedCheckBoxes}
                                       selectedCheckBoxes={selectedCheckBoxes}
                                       comments={chunkPublishedComments}
                                       totalPublishPage={totalPublishPage}
                                       totalUnconfirmPage={totalUnconfirmPage}
                                       handlePagination={handlePagination}
                                       commentStatus={commentStatus}
                                       publishedComments={publishedComments}
                                       unconfirmedComments={unconfirmedComments}
                                       publishPage={publishPage}
                                       setPublishPage={setPublishPage}
                                       unconfirmPage={unconfirmPage}
                                       setUnconfirmPage={setUnconfirmPage}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CommentTableComponent setSelectedCheckBoxes={setSelectedCheckBoxes}
                                       totalPublishPage={totalPublishPage}
                                       totalUnconfirmPage={totalUnconfirmPage}
                                       selectedCheckBoxes={selectedCheckBoxes}
                                       comments={chunkUnconfirmedComments}
                                       handlePagination={handlePagination}
                                       commentStatus={commentStatus}
                                       publishedComments={publishedComments}
                                       unconfirmedComments={unconfirmedComments}
                                       publishPage={publishPage}
                                       setPublishPage={setPublishPage}
                                       unconfirmPage={unconfirmPage}
                                       setUnconfirmPage={setUnconfirmPage}
                />
            </TabPanel>
        </StyledPaper>
    );
}

export default withNamespaces('comments')(CommentDashboardComponent);
