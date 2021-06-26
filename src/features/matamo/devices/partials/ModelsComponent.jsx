import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"

import {Typography} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination";

import {getModelDevicesMethod} from "./DevicesComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"

import {StyledTableCell} from "assets/js/library/components/table"
import {
    StyledTableParent,
    StyledTablePaper,
} from "assets/js/App";
import i18next from "i18next";
import {handlePaginationMethod} from "./DevicesComponent";
import {StyledPaginationBox} from "assets/js/pagination";

function DevicesComponent({t}) {
    const {setLoading} = useContext(AppContext)
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const [page, setPage] = useState(0)
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [models, setModels] = useState([
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
        {label: "negar", nb_visits: "visits"},
    ])

    const handlePagination = (items) => {
        handlePaginationMethod(items, setChunks, setTotalPage)
    }


    useEffect(() => {
        getModelDevicesMethod(setLoading, setModels, handlePagination)
    }, [setLoading, setModels])

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    return (<>
        <StyledTableParent length={models.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:deviceModel')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledTableCell width="95" align={leftRightAlign}>{t('translation:type')}</StyledTableCell>
                        <StyledTableCell minWidth="50" width="5" align="center">{t('matamo:visits')}</StyledTableCell>
                    </StyledMatamoTableHeadRow>
                    {chunks.length > 0 && chunks[page].map((device, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell width="95" align={leftRightAlign}>  {device.label}</StyledTableCell>
                            <StyledTableCell minWidth="50" width="5"
                                             align="center"> {device.nb_visits} </StyledTableCell>
                        </StyledMatamoTableRow>
                    )}
                </StyledMatamoTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledTableParent>
    </>)
}

export default withNamespaces('translation,matamo')(DevicesComponent)
