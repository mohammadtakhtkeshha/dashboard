import React, {useContext, useEffect, useState} from 'react'
import i18next from "i18next"

import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import {withStyles, makeStyles} from "@material-ui/core/styles"
import {Box, Grid, Typography} from "@material-ui/core"
import {withNamespaces} from 'react-i18next'

import {styledTreeItem, styledTreeView, styledGridItem} from "assets/js/taxonomy/stateTable"
import {
    StyledDeleteButton,
    StyledEditButton,
    StyledActionButtonBlock,
    StyledRegisterButton,
    StyledRelative, StyledTableBody, StyledTable, StyledTableHeadRow, StyledTableCell
} from "assets/js/App"
import {isObjectEmpty} from "methods/commons"
import {warning} from "methods/swal"
import {deleteStateMethod} from "./StateTableComponent.js"
import AppContext from "contexts/AppContext";
import {StyledTreeTable} from "../../../../../../assets/js/library/layout/dragDrop";
import SortableTree from "react-sortable-tree";
import {
    StyledTreeActionButtons,
    StyledTypographyTitle,
    StyledButtonsBlock,
    StyledButtonTree,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";

const useStyles = makeStyles(treeStyles)

function StateTableComponent({t, setOpenForm, ids, states, chunks, page, setStates,setChunks}) {
    const classes = useStyles()
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [dynamicHeight, setDynamicHeight] = useState(0)

    const deleteState = (id) => {
        deleteStateMethod(id, t, states, appContext, setStates)
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id)
        })
    }

    const changeTreeData = (e) => {
        setChunks(prevState => {
            prevState[page] = e
            return [...prevState]
        })
    }

    useEffect(() => {
        if (chunks[page] !== undefined && chunks[page].length > 0) {
            setDynamicHeight(`${chunks[page].length*63}px`)
        }
    }, [chunks])

    return (<Box>
        <StyledTable>
            <StyledTableHeadRow>
                <StyledTableCell>{t('taxonomy:tagsList')}</StyledTableCell>
            </StyledTableHeadRow>
        </StyledTable>
        {chunks[page] !== undefined &&
        chunks[page].length > 0 ?
            <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                <SortableTree
                    rowDirection={lang === "fa" ? "rtl" : "ltr"}
                    treeData={chunks[page]}
                    className={classes.root}
                    onChange={changeTreeData}
                    generateNodeProps={({node, path}) => ({
                        title: (
                            <StyledTreeActionButtons>
                                <StyledTypographyTitle>
                                    {node.title}
                                </StyledTypographyTitle>
                                <StyledButtonsBlock>
                                    <StyledButtonTree value={node.id} onClick={confirmDeleteHandler}><img
                                        src={deleteIcon} alt=""/></StyledButtonTree>
                                    <StyledButtonTree value={node.id} onClick={() => {
                                        setOpenForm({show: true, id: node.id})
                                    }}><img src={editIcon} alt=""/></StyledButtonTree>
                                </StyledButtonsBlock>
                            </StyledTreeActionButtons>
                        ),
                    })}
                />
            </StyledTreeTable> : ""}
    </Box>)
}

export default withNamespaces('translation')(StateTableComponent)
