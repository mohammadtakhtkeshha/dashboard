import React, {useContext, useState, useEffect} from 'react'
import i18next from "i18next"
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {withNamespaces} from 'react-i18next'

import {StyledTable, StyledTableCell, StyledTableHeadRow} from "assets/js/App"
import {warning} from "methods/swal"
import {deleteStateMethod} from "./StateTableComponent.js"
import {StyledTreeTable} from "assets/js/library/layout/dragDrop"
import SortableTree from 'react-sortable-tree';
import {
    StyledTreeActionButtons,
    StyledTypographyTitle,
    StyledButtonsBlock,
    StyledButtonTree,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import AppContext from "contexts/AppContext";
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"

const useStyles = makeStyles(treeStyles)

function StateTableComponent({t, setOpenForm, ids, states, chunks, page, setStates, handlePagination, setIds, setChunks, getStates,type}) {
    const classes = useStyles()
    const lang = i18next.language
    const [dynamicHeight, setDynamicHeight] = useState(0)
    const appContext = useContext(AppContext)

    const deleteState = (id) => {
        deleteStateMethod(id, t, states, appContext, setStates, handlePagination, setIds, getStates)
    }

    const changeTreeData = (e) => {
        setChunks(prevState => {
            prevState[page] = e
            return [...prevState]
        })
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id)
        })
    }

    useEffect(() => {
        if (chunks[page] !== undefined && chunks[page].length > 0) {
            setDynamicHeight(`${chunks[page].length * 63}px`)
        }
    }, [chunks])

    return (<Box>
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell>{t(`taxonomy:${type.type}`)}</StyledTableCell>
                </StyledTableHeadRow>
            </StyledTable>
            {chunks[page] !== undefined && chunks[page].length > 0 ?
                <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                    <SortableTree rowDirection={lang === "fa" ? "rtl" : "ltr"}
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
                                                  }}>
                                                      <img src={editIcon} alt=""/>
                                                  </StyledButtonTree>
                                              </StyledButtonsBlock>
                                          </StyledTreeActionButtons>
                                      ),
                                  })}/>
                </StyledTreeTable> : ""}
        </Box>
    )
}

export default withNamespaces('translation')(StateTableComponent)
