import React, {useState, useContext, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import {useLocation} from "react-router-dom";

import {Box} from '@material-ui/core/index';
import Pagination from "@material-ui/lab/Pagination";

import vocabService from 'core/services/vocab.service'
import AppContext from "contexts/AppContext";
import {StyledPaper, StyledHead, StyledHeadTypography, StyledBox, StyledButton} from 'assets/js/App';
import TermTableComponent from "./partials/TermTableComponent";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from 'structure/layout';
import HeaderTermComponent from './partials/HeaderTermComponent';
import NewTermModalComponent from './partials/NewTermModalComponent';

function TermsComponent({t}) {
    const appContext = useContext(AppContext);
    const location = useLocation();
    const [terms, setTerms] = useState([]);
    const [openTermForm, setOpenAddForm] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [chunks, setChunks] = useState([]);

    const getTerms = () => {
        vocabService.getTerms(location.state.vocab).then((response) => {
            const terms = response.data;
            handlePagination(terms);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const handlePagination = (terms) => {
        setTerms(terms);
        const currentLength = handleTotalPage(terms);
        setTotalPage(currentLength);
        const chunkTerms = chunkItem(terms);
        setChunks(chunkTerms);
    }

    const handleOpen = () => {
        alert('alert');
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getTerms();
    }, []);

    return (<>
        <StyledPaper>
            <HeaderTermComponent setOpenAddForm={() => setOpenAddForm(true)}/>
            <StyledBox>
                <Box className="block">
                    <TermTableComponent terms={terms} chunks={chunks} page={page}/>
                </Box>
            </StyledBox>
        </StyledPaper>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
        <NewTermModalComponent openTermForm={openTermForm} setOpenTermForm={()=>setOpenAddForm(false)}/>
    </>);
}

export default withNamespaces('vocabs')(TermsComponent);
