import React, {useState, useContext, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import {useLocation} from "react-router-dom";

import {Box} from '@material-ui/core/index';
import {Typography} from "@material-ui/core";

import vocabService from 'core/services/vocab.service'
import AppContext from "contexts/AppContext";
import {StyledPaper, StyledHead, HeadButtonStyled, StyledHeadTypography, StyledBox, StyledButton} from 'assets/js/App';
import TermTableComponent from "./partials/TermTableComponent";
import {StyledPaginationBox} from "../../../../assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";



function TermsComponent({t}) {
    const appContext = useContext(AppContext);
    const location = useLocation();
    const [terms, setTerms] = useState([]);
    const [openTermForm, setOpenTermForm] = useState(false);
    const [totalPage,setTotalPage]=useState(0);
    const [page,setPage]=useState(0);
    const [chunks,setChucks]=useState([]);

    const getTerms = () => {
        vocabService.getTerms(location.state.vocab.vid).then((response) => {
            const terms=response.data;
            setTerms(terms);
            const currentLength = Math.ceil(terms.length/appContext.perPage);
            setTotalPage(currentLength);
            chunckedTerm(terms);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const chunckedTerm = (terms) => {
        let newList=[];
        for(let index = 0 ;index< terms.length ; index += appContext.perPage){
            let sliced = terms.slice(index,index+appContext.perPage);
            newList.push(sliced);
        }
        setChucks(newList);
    }

    useEffect(() => {
        getTerms();
    }, []);

    const handleOpen = () => {
        alert('alert');
    }

    const paginate = (e,value) => {
        setPage(value-1);
    }

    return (<>
        <StyledPaper>
            <StyledHead>
                <StyledHeadTypography>{t('vocabs:termList')}</StyledHeadTypography>
                <StyledButton onClick={() => setOpenTermForm(true)}>
                    <Typography>{t('vocabs:newTerm')}</Typography>
                </StyledButton>
            </StyledHead>
            <StyledBox>
                <Box className="block">
                    <TermTableComponent terms={terms} chunks={chunks} page={page}/>
                </Box>
            </StyledBox>
        </StyledPaper>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
        {/*<NewTermModalComponent open={open} setOpen={setOpen} vocab={vocab}/>*/}
    </>);
}

export default withNamespaces('vocabs')(TermsComponent);
