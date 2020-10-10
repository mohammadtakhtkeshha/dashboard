import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';

import {Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Modal from "./partials/modal/ModalComponent.jsx";
import ContentSearchExpansion from "./partials/ContentsFilterComponent";
import TitleComponent from "components/partials/TitleComponent";
import contentService from "core/services/content.service";
import AppContext from "contexts/AppContext";
import ContentActionComponent from "./partials/action/ContentActionComponent";
import ContentTableComponent from "./partials/ContentTableComponent";
import {success} from "methods/swal";
import ContentsContext from "contexts/ContentsContext";
import {StyledPaper, StyledBox} from "assets/js/App";
import ContentHeaderComponent from "./partials/ContentHeaderComponent";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from "structure/layout";
import {ModalBody} from "../../../assets/js/content/partials/contentModal";

function ContentsComponent({t}) {
    const appContext = useContext(AppContext);
    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentTypeList, setContentTypeList] = useState([]);
    const [chunkContents, setChunkContents] = useState();
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState({
        "type": {
            "target_id": ""
        },
        "title": "",
        "body": "",
        "field_domain_access": {},
        "field_domain_all_affiliates": true,
        "field_domain_source": {},
        "field_field_galeries": {},
        "field_files": {},
        "field_image": {},
        "field_rotitr": "",
        "field_sotitr": "",
        "field_sounds": {},
        "field_article_cat": {},
        "field_tags": {},
        "field_seo_list": {},
        "field_videos": {},
        "field_special_news_display": false,
        "status": false,
    });

    const getContents = () => {
        appContext.setLoading(true);
        contentService.getContents(appContext.handleError).then((response) => {
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

    const getContentType = () => {
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
        handlePagination(contents, t('translation:successRegistered'));
    }

    const handleOpenContentForm = (e) => {
        const value = e.currentTarget.value;
        setOpenRegisterForm(true);
        if (value !== "") {
            setId(value);
        }
    }

    const handleCloseContentForm = (id) => {
        setOpenRegisterForm(false);
        setId('');
    }

    useEffect(() => {
        getContents(page);
        getContentType();
    }, []);

    useEffect(() => {
        contentService.getContent(id).then((response)=>{debugger
            setContent(response.data);
        }).catch((error)=>{
            alert(error);
        });
    }, [id]);


    return (<ContentsContext.Provider value={{
            contents: contents,
            chunkContents: chunkContents,
            contentTypeList: contentTypeList,
            handlePagination: handlePagination,
            getRegisteredContent: getRegisteredContent,
            id:id,
            setId:setId,
            content:content,
            setContent:setContent,
            setErrors: setErrors,
            errors: errors,

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
                                           handleOpenContentForm={handleOpenContentForm}/>
                </StyledBox>
                <ContentActionComponent selectedCheckBoxes={selectedCheckBoxes}
                                        setSelectedCheckBoxes={setSelectedCheckBoxes}/>
                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>
            <TitleComponent title="contents"/>
            <Box>
                <Modal handleCloseContentForm={handleCloseContentForm} openRegisterForm={openRegisterForm}/>
            </Box>
        </ContentsContext.Provider>
    );
}

export default withNamespaces('contents')(ContentsComponent);