import React, {useContext, useState, useEffect} from 'react'
import i18next from "i18next"
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {withNamespaces} from 'react-i18next'

import {StyledTable, StyledTableCell, StyledTableHeadRow} from "assets/js/App"
import {StyledActionsBlock, StyledActionButtons, StyledTreeTable} from "assets/js/App"
import {warning} from "methods/swal"
import {deleteStateMethod} from "./StateTableComponent.js"
import SortableTree from 'react-sortable-tree';
import {
    StyledTreeRow,
    StyledTypographyTitle,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import AppContext from "contexts/AppContext";
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"

const useStyles = makeStyles(treeStyles)

function StateTableComponent({t, setOpenForm, ids, states, setStates, setIds, getStates, type}) {
    const classes = useStyles()
    const lang = i18next.language
    const [dynamicHeight, setDynamicHeight] = useState(0)
    const appContext = useContext(AppContext)

    const deleteState = (id) => {
        deleteStateMethod(id, t, states, appContext, setStates, setIds, getStates)
    }

    const changeTreeData = (e) => {
        // setChunks(prevState => {
        //     prevState = e
        //     return [...prevState]
        // })
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id)
        })
    }

    useEffect(() => {
        if (states !== undefined && states.length > 0) {
            let count = states.length
            for (let item of states) {
                if (item.children.length > 0) {
                    count = count + item.children.length
                    if (item.children && item.children.length > 0) {
                        for (let part of item.children) {
                            count = count + part.children.length
                        }
                    }
                }
            }
            setDynamicHeight(`${count * 63}px`)
        }
    }, [states])

    return (<Box>
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell>{t(`taxonomy:${type.type}`)}</StyledTableCell>
                </StyledTableHeadRow>
                {states !== undefined && states.length > 0 ?
                    <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                        <SortableTree rowDirection={lang === "fa" ? "rtl" : "ltr"}
                                      treeData={states}
                                      className={classes.root}
                                      onChange={changeTreeData}
                                      generateNodeProps={({node, path}) => ({
                                          title: (
                                              <StyledTreeRow>
                                                  <StyledTypographyTitle>
                                                      {node.title}
                                                  </StyledTypographyTitle>
                                                  <StyledActionsBlock>
                                                      <StyledActionButtons value={node.id}
                                                                           onClick={confirmDeleteHandler}>
                                                          <img src={deleteIcon} alt=""/>
                                                      </StyledActionButtons>
                                                      <StyledActionButtons value={node.id} onClick={() => {
                                                          setOpenForm({show: true, id: node.id})
                                                      }}>
                                                          <img src={editIcon} alt=""/>
                                                      </StyledActionButtons>
                                                  </StyledActionsBlock>
                                              </StyledTreeRow>
                                          ),
                                      })}/>
                    </StyledTreeTable> : ""}
            </StyledTable>
        </Box>
    )
}

export default withNamespaces('translation')(StateTableComponent)
