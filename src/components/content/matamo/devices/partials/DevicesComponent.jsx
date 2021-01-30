import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"

import {Typography, Box, CardMedia} from "@material-ui/core"

import {getDevicesMethod, handlePaginationMethod} from "./DevicesComponent.js"
import AppContext from "contexts/AppContext"
import {StyledDeviceBox, StyledLabel} from "assets/js/library/pages/matamo/devices"
import {
    StyledTable,
    StyledTableBody,
    StyledTableBodyRow,
    StyledTableCell,
    StyledTableParent,
    StyledTablePaper,
    StyledTableHeadRow, StyledPaper
} from "assets/js/App";
import i18next from "i18next";
import {StyledPaginationBox} from "../../../../../assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";

function DevicesComponent({t}) {
    const appContext = useContext(AppContext)
    const [page, setPage] = useState(0)
    const lang = i18next.language
    const [devices, setDevices] = useState([
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
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    const handlePagination = (items) => {
        handlePaginationMethod(items, setChunks, setTotalPage,setDevices)
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getDevicesMethod(appContext,setDevices,handlePagination)
    }, [])

    return (<>
        <StyledTableParent length={devices.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:devices')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('translation:type')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:visits')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {chunks.length > 0  && chunks[page].map((device, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">  {device.label}</StyledTableCell>
                                <StyledTableCell align="right"> {device.nb_visits} </StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledTableParent>
    </>)
}

export default withNamespaces('translation,matamo')(DevicesComponent)
