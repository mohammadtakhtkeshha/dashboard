import React, {useState, useContext, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import {useLocation} from "react-router-dom";

import {Box} from '@material-ui/core/index';
import Pagination from "@material-ui/lab/Pagination";

import vocabService from 'core/services/vocab.service'
import AppContext from "contexts/AppContext";
import {StyledPaper, StyledBox} from 'assets/js/App';
import TermTableComponent from "./partials/TermTableComponent";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from 'structure/layout';
import HeaderTermComponent from './partials/HeaderTermComponent';
import NewTermModalComponent from './partials/NewTermModalComponent';
import TermsContext from "contexts/TermsContext";
import {success} from "methods/swal";

function TermsComponent({t}) {
    const appContext = useContext(AppContext);
    const location = useLocation();
    const [terms, setTerms] = useState([]);
    const [openTermForm, setOpenTermForm] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [chunks, setChunks] = useState([]);
    const [id, setId] = useState('');

    const getTerms = () => {
        vocabService.getTerms(location.state.vocab).then((response) => {
            const terms = response.data;
            handlePagination(terms);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const handlePagination = (terms, action) => {
        setTerms(terms);
        const currentLength = handleTotalPage(terms);
        setTotalPage(currentLength);
        const chunkTerms = chunkItem(terms);
        setChunks(chunkTerms);
        action && success(action, t('translation:ok'))
    }

    const handleOpen = () => {
        alert('alert');
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    const getRegisteredTerm = (term) => {
        const newTerm = {tid: `${term.tid}`, name: term.name};
        terms.unshift(newTerm);
        handlePagination(terms);
    }

    useEffect(() => {
        getTerms();
    }, []);

    const handleOpenTermForm = (id) => {
        setOpenTermForm(true);
        debugger
        setId(id);
    }

    return (<TermsContext.Provider value={{
        getRegisteredTerm: getRegisteredTerm,
        handlePagination: handlePagination,
        id: id,
    }}>
        <StyledPaper>
            <HeaderTermComponent setOpenTermForm={() => setOpenTermForm(true)}/>
            <StyledBox>
                <TermTableComponent setOpenTermForm={handleOpenTermForm} terms={terms} chunks={chunks}
                                    page={page}/>
                <Box className="block">
                </Box>
            </StyledBox>
        </StyledPaper>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
        <NewTermModalComponent category={location.state.vocab} openTermForm={openTermForm}
                               setOpenTermForm={() => setOpenTermForm(false)}/>
    </TermsContext.Provider>);
}

export default withNamespaces('vocabs')(TermsComponent);
