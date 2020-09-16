import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";

import vocabService from 'core/services/vocab.service'
import VocabContext from "contexts/VocabContext";
import VocabsTableComponent from "./partials/VocabsTableComponent";
import AppContext from "contexts/AppContext";
import {StyledPaper} from "assets/js/App";
import {StyledPaginationBox} from "../../../assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {chunkItem, handleTotalPage} from "../../../structure/layout";


function Index() {
    const [vocabs, setVocabs] = useState([]);
    const [chunks, setChunks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const appContext = useContext(AppContext);


    const getVocabs = () => {
        vocabService.getVocabs().then((response) => {
            const vocabs = response.data;
            handlePagination(vocabs)
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const handlePagination = (currentVocabs) => {
        const chunks = chunkItem(currentVocabs);
        setVocabs(currentVocabs);
        const total = handleTotalPage(currentVocabs);
        setTotalPage(total);
        setChunks(chunks);
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getVocabs();
    }, []);

    return (<VocabContext.Provider value={{vocab: 'vocab'}}>
        <StyledPaper>
            <VocabsTableComponent vocabs={vocabs} chunks={chunks} page={page}/>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledPaper>

    </VocabContext.Provider>);
}

export default withNamespaces('translation,vocabs')(Index);
