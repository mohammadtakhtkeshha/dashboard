import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';

//
import {Box, Typography} from '@material-ui/core';
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
import {StyledPaper, StyledHead, StyledHeadTypography, StyledButton, StyledBox} from "../../../assets/js/App";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem} from "structure/layout";

function ContentsComponent({t}) {
    const appContext = useContext(AppContext);
    const [openRegisterForm, setOpenRegisterForm] = React.useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentTypeList, setContentTypeList] = useState([]);
    const [chunckContents, setChunckContents] = useState();

    const getContents = () => {
        contentService.getContents().then((response) => {
                let contents = response.data;
                handlePagination(contents);
            }
        ).catch(function (error) {
            appContext.handleError(error);
        });
    };

    const paginate = (e, value) => {
        setPage(value - 1);
        getContents(value);
    };

    const handlePagination = (contents) => {
        setContents(contents);
        let currentTotalPage = Math.ceil(contents.length / appContext.perPage);
        setTotalPage(currentTotalPage);
    }

    const afterUpdateHandler = (newContents, currentLength, changeContent, action) => {
        changeContent && setContents([...newContents]);
        let currentTotalPage = Math.ceil(currentLength / appContext.perPage);
        setTotalPage(currentTotalPage);
        chunkItem(newContents);
        action && success(t(`translation:${action}`), t('translation:ok'));
    }

    let getContentType = () => {
        contentService.getContentTypeList().then((response) => {
            setContentTypeList(response.data);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const chunckHandler = (currentContents) => {
        let contentLength = currentContents.length;
        let newList = [];
        for (let i = 0; i < contentLength; i += appContext.perPage) {
            let myChunk = currentContents.slice(i, i + appContext.perPage);
            newList.push(myChunk);
        }
        setChunckContents(newList);
    };

    useEffect(() => {
        getContents(page);
        getContentType();
    }, []);

    return (<ContentsContext.Provider value={{
            contents: contents,
            chunckHandler: chunckHandler,
            chunckContents: chunckContents,
            afterUpdateHandler: afterUpdateHandler,
            contentTypeList: contentTypeList
        }}>
            <StyledPaper>
                <StyledHead>
                    <StyledHeadTypography>{t('contents:contentList')}</StyledHeadTypography>
                    <StyledButton onClick={() => setOpenRegisterForm(true)}>
                        <Typography>{t('translation:registerContent')}</Typography>
                    </StyledButton>
                </StyledHead>
                <StyledBox>
                    <ContentSearchExpansion/>
                </StyledBox>
                <StyledBox>
                    <ContentActionComponent selectedCheckBoxes={selectedCheckBoxes}/>
                </StyledBox>
                <StyledBox>
                    <ContentTableComponent selectedCheckBoxes={selectedCheckBoxes} contents={contents}
                                           setSelectedCheckBoxes={setSelectedCheckBoxes}
                                           setTotalPage={setTotalPage}
                                           page={page}
                                           setContents={setContents}
                    />
                </StyledBox>
                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>
            <TitleComponent title="contents"/>
            <Box>
                <ContentRegisterModalComponent
                    clickCloseRegisterForm={() => setOpenRegisterForm(false)}
                    openRegisterForm={openRegisterForm}
                />
            </Box>
        </ContentsContext.Provider>
    );
}

export default withNamespaces('contents')(ContentsComponent);
