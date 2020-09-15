import React, {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import {withNamespaces} from 'react-i18next';

import {makeStyles} from "@material-ui/styles";
import {Box, Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import {useStyles} from "assets/js/content/contents"
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

const useStyle = makeStyles(useStyles);

function ContentsComponent({t}) {
    let perPage = 5;
    const appContext = useContext(AppContext);
    const classes = useStyle();
    const [openRegisterForm, setOpenRegisterForm] = React.useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentTypeList, setContentTypeList] = useState([]);
    const [chunckContents, setChunckContents] = useState();

    let getContents = () => {
        contentService.getContents().then((response) => {
                let contents = response.data;
                setContents(contents);
                let currentTotalPage = Math.ceil(response.data.length / perPage);
                setTotalPage(currentTotalPage);
            }
        ).catch(function (error) {
            appContext.handleError(error);
        });
    };

    let paginate = (e, value) => {
        setPage(value - 1);
        getContents(value);
    };

    const afterUpdateHandler = (newContents, currentLength, changeContent, action) => {
        changeContent && setContents([...newContents]);
        let currentTotalPage = Math.ceil(currentLength / perPage);
        setTotalPage(currentTotalPage);
        chunckHandler(newContents);
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
        for (let i = 0; i < contentLength; i += perPage) {
            let myChunk = currentContents.slice(i, i + perPage);
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
                                           perPage={perPage}
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
