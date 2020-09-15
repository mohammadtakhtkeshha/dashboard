import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";

import vocabService from 'core/services/vocab.service'
import VocabContext from "contexts/VocabContext";
import VocabsTableComponent from "./partials/VocabsTableComponent";
import AppContext from "contexts/AppContext";
import {StyledPaper} from "assets/js/App";
import {StyledPaginationBox} from "../../../assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";


function Index() {
    const [vocabs, setVocabs] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const appContext=useContext(AppContext);
    const perPage = 5 ;


    const getVocabs = () => {
        vocabService.getVocabs().then((response) => {
            setVocabs(response.data);
            const currentLength = Math.ceil(response.data.length/perPage);
            setTotalPage(currentLength);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const paginate = (value) => {
        debugger
    }

    useEffect(() => {
        getVocabs();
    }, []);

    return (<VocabContext.Provider value={{vocab:'vocab'}}>
        <StyledPaper>
                <VocabsTableComponent vocabs={vocabs}/>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledPaper>

        </VocabContext.Provider>);
}

export default withNamespaces('translation,vocabs')(Index);
