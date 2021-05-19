import React, { useEffect, useState, useContext } from "react"
import { withNamespaces } from "react-i18next"
import i18next from "i18next";

import { Typography } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination";

import { getDevicesMethod, handlePaginationMethod } from "./DevicesComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledTableParent,
    StyledTablePaper,
} from "assets/js/App";
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"
import { StyledTableCell } from "assets/js/library/components/table"
import { StyledPaginationBox } from "assets/js/pagination";

function DevicesComponent({ t }) {
    const {setLoading} = useContext(AppContext)
    const [page, setPage] = useState(0)
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const [devices, setDevices] = useState([
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
        { label: "negar", nb_visits: "visits" },
    ])
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    const handlePagination = (items) => {
        handlePaginationMethod(items, setChunks, setTotalPage, setDevices)
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getDevicesMethod(setLoading, setDevices, handlePagination)
    }, [setLoading,setDevices])//Once

    return (<>
        <StyledTableParent length={devices.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:devices')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledTableCell width="95" align={leftRightAlign}>{t('translation:type')}</StyledTableCell>
                        <StyledTableCell minWidth="50" width="5" align="center">{t('matamo:visits')}</StyledTableCell>
                    </StyledMatamoTableHeadRow>
                    {chunks.length > 0 && chunks[page].map((device, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell width="95" align={leftRightAlign}>  {device.label}</StyledTableCell>
                            <StyledTableCell minWidth="50" width="5" align="center"> {device.nb_visits} </StyledTableCell>
                        </StyledMatamoTableRow>
                    )}
                </StyledMatamoTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate} />
            </StyledPaginationBox>
        </StyledTableParent>
    </>)
}

export default withNamespaces('translation,matamo')(DevicesComponent)
