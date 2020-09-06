import React, {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import {withNamespaces} from 'react-i18next';

import {makeStyles} from "@material-ui/styles";
import {Box, Paper, Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import {useStyles} from "assets/js/content/contents"
import ContentRegisterModalComponent from "./partials/ContentRegisterModalComponent";
import ContentSearchExpansion from "./partials/ContentSearchExpansion";
import TitleComponent from "components/partials/TitleComponent";
import contentService from "core/services/content.service";
import {danger} from "methods/swal";
import AppContext from "contexts/AppContext";
import ContentActionComponent from "./partials/ContentActionComponent";
import ContentTableComponent from "./partials/ContentTableComponent";

const useStyle = makeStyles(useStyles);

function ContentsComponent({t}) {
    let perPage=5;
    const appContext = useContext(AppContext);
    const classes = useStyle();
    const [openRegisterForm, setOpenRegisterForm] = React.useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);

    let handleError = (error) => {
        danger(t('translation:error'), t('translation:ok'));
        appContext.toggleLoading(false);
        console.log(error);
    };

    let getContents = () => {
        contentService.getContents().then((response) => {debugger
                let contents = response.data;
                setContents(contents);
                let currentTotalPage=Math.ceil(response.data.length/perPage);
                setTotalPage(currentTotalPage);
            }
        ).catch(function (error) {
            handleError(error);
        });
    };

    useEffect(() => {
        getContents(page);
    }, []);

    let paginate = (e, value) => {debugger
        setPage(value);
        getContents(value);
    };

    return (<>
        <TitleComponent title="contents"/>
        <Paper className={classes.mypaper}>
            <Box className="head">
                <Typography className="text">{t('contents:contentList')}</Typography>
                <button type="button" onClick={() => setOpenRegisterForm(true)}>
                    <Typography>{t('translation:registerContent')}</Typography>
                </button>
            </Box>
            <Box className={clsx("filter", "box")}>
                <ContentSearchExpansion/>
            </Box>

            <Box className={clsx("box")}>
                <ContentActionComponent/>
            </Box>
            <ContentTableComponent selectedCheckBoxes={selectedCheckBoxes} contents={contents}
                                   setSelectedCheckBoxes={setSelectedCheckBoxes}
                                   perPage={perPage}
                                   setTotalPage={setTotalPage}
            setContents={setContents}/>
            <Box className={classes.pagination}>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </Box>
        </Paper>

        <Box>
            <ContentRegisterModalComponent
                clickCloseRegisterForm={() => setOpenRegisterForm(false)}
                openRegisterForm={openRegisterForm}
            />
        </Box>
    </>);
}

export default withNamespaces('contents')(ContentsComponent);
