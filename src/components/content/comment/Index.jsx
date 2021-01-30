import React, {useContext, useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {withNamespaces} from 'react-i18next';

import CommentsListComponent from "./partials/list/CommentTabsComponent.jsx";
import CommentsActionComponent from "./partials/CommentsActionComponent.jsx";
import CommentsFileterComponent from "./partials/CommentsFilterComponent.jsx";
import {getPublishedCommentsMethod, getUnconfirmedCommentsMethod, handlePaginationMethod} from "./Index.js";
import AppContext from "contexts/AppContext";


function Index({t}) {
    const appContext = useContext(AppContext);
    const [publishPage, setPublishPage] = useState(0);
    const [unconfirmPage, setUnconfirmPage] = useState(0);
    const [totalPublishPage, setTotalPublishPage] = useState(0);
    const [totalUnconfirmPage, setTotalUnconfirmPage] = useState(0);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [publishedComments, setPublishedComments] = useState([]);
    const [chunkPublishedComments, setChunkPublishedComments] = useState([]);
    const [unconfirmedComments, setUnconfirmedComments] = useState([]);
    const [chunkUnconfirmedComments, setChunkUnconfirmedComments] = useState([]);
    const [commentStatus, setCommentStatus] = useState('published');

    const getPublishedComments = () => {
        getPublishedCommentsMethod(handlePagination, setPublishedComments, appContext, setCommentStatus);
    }

    const getUnconfirmedComments = () => {
        getUnconfirmedCommentsMethod(handlePagination, setUnconfirmedComments, appContext);
    }

    const handlePagination = (comments, showSuccessMessage, changeDefaultComments, begining) => {
        handlePaginationMethod(t, showSuccessMessage, comments, changeDefaultComments, commentStatus, begining, setUnconfirmedComments, setPublishedComments, setChunkPublishedComments, setChunkUnconfirmedComments, setTotalUnconfirmPage,setTotalPublishPage,setSelectedCheckBoxes)
    }

    useEffect(() => {
        getPublishedComments();
        getUnconfirmedComments();
    }, []);

    return (<>
        <Helmet>
            <title>
                {t('comments:comments')}
            </title>
        </Helmet>
        <CommentsFileterComponent commentStatus={commentStatus}
                                  publishedComments={publishedComments}
                                  unconfirmedComments={unconfirmedComments}
                                  handlePagination={handlePagination}
        />
        <CommentsListComponent publishPage={publishPage}
                               setPublishPage={setPublishPage}
                               unconfirmPage={unconfirmPage}
                               setUnconfirmPage={setUnconfirmPage}
                               totalPublishPage={totalPublishPage}
                               totalUnconfirmPage={totalUnconfirmPage}
                               setCommentStatus={setCommentStatus}
                               handlePagination={handlePagination}
                               commentStatus={commentStatus}
                               selectedCheckBoxes={selectedCheckBoxes}
                               setSelectedCheckBoxes={setSelectedCheckBoxes}
                               unconfirmedComments={unconfirmedComments}
                               publishedComments={publishedComments}
                               chunkPublishedComments={chunkPublishedComments}
                               chunkUnconfirmedComments={chunkUnconfirmedComments}/>
        <CommentsActionComponent commentStatus={commentStatus}
                                 handlePagination={handlePagination}
                                 selectedCheckBoxes={selectedCheckBoxes}
                                 unconfirmedComments={unconfirmedComments}
                                 publishedComments={publishedComments}/>

    </>);
}

export default withNamespaces('comments')(Index);
