import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';

import {Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import ContentRegisterModalComponent from "./partials/ContentRegisterModalComponent";
import ContentSearchExpansion from "./partials/ContentsFilterComponent";
import TitleComponent from "components/partials/TitleComponent";
import contentService from "core/services/content.service";
import AppContext from "contexts/AppContext";
import ContentActionComponent from "./partials/ContentActionComponent";
import ContentTableComponent from "./partials/ContentTableComponent";
import {success} from "methods/swal";
import ContentsContext from "contexts/ContentsContext";
import {StyledPaper, StyledBox} from "assets/js/App";
import ContentHeaderComponent from "./partials/ContentHeaderComponent";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from "structure/layout";

function ContentsComponent({t}) {
    const appContext = useContext(AppContext);
    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentTypeList, setContentTypeList] = useState([]);
    const [chunkContents, setChunkContents] = useState();
    const [id,setId] = useState('');

    const getContents = () => {
        appContext.setLoading(true);
        contentService.getContents().then((response) => {
                let contents = response.data;
                appContext.setLoading(false);
                handlePagination(contents);
            }
        );
    }

    const paginate = (e, value) => {
        setPage(value - 1);
        getContents(value);
        setSelectedCheckBoxes([]);
    }

    const handlePagination = (contents, action) => {
        setContents(contents);
        let currentTotalPage = handleTotalPage(contents);
        setTotalPage(currentTotalPage);
        const chunked = chunkItem(contents);
        setChunkContents(chunked)
        setSelectedCheckBoxes([]);
        action && success(t(`translation:${action}`), t('translation:ok'));
    }

    let getContentType = () => {
        appContext.setLoading(true);
        contentService.getContentTypeList(appContext.handleError).then((response) => {
            appContext.setLoading(false);
            setContentTypeList(response.data);
        });
    }

    const getRegisteredContent = (content) => {
        const newContent = {
            type: content.target_id,
            status: `${content.status}`,
            title: content.title,
            uid: content.uid.target_uuid,
            changed: content.changed,
            nid: `${content.nid}`,
            field_image: content.field_image?.url
        }
        contents.unshift(newContent);
        handlePagination(contents,t('translation:successRegistered'));
    }

    const handleOpenContentForm = (e) => {debugger
        const value=e.currentTarget.value;
        setOpenRegisterForm(true);
        if(value !== ""){
            setId(id);
        }
    }
    const handleCloseContentForm = (id) => {
        setOpenRegisterForm(false);
        setId('');
    }

    useEffect(() => {
        getContents(page);
        getContentType();
    }, [])

    return (<ContentsContext.Provider value={{
            contents: contents,
            chunkContents: chunkContents,
            contentTypeList: contentTypeList,
            handlePagination: handlePagination,
            getRegisteredContent: getRegisteredContent,
        }}>
            <StyledPaper>
                <ContentHeaderComponent setOpenRegisterForm={handleOpenContentForm}/>
                <StyledBox>
                    <ContentSearchExpansion/>
                </StyledBox>
                <StyledBox>
                    <ContentTableComponent selectedCheckBoxes={selectedCheckBoxes}
                                           contents={contents}
                                           setSelectedCheckBoxes={setSelectedCheckBoxes}
                                           page={page}
                                           setContents={setContents}
                                           handleOpenContentForm={handleOpenContentForm}
                    />
                </StyledBox>
                <ContentActionComponent selectedCheckBoxes={selectedCheckBoxes}
                                        setSelectedCheckBoxes={setSelectedCheckBoxes}/>
                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>
            <TitleComponent title="contents"/>
            <Box>
                <ContentRegisterModalComponent
                    handleCloseContentForm={handleCloseContentForm}
                    openRegisterForm={openRegisterForm}
                />
            </Box>
        </ContentsContext.Provider>
    );
}

export default withNamespaces('contents')(ContentsComponent);