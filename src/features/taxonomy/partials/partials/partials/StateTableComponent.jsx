import React, {useContext, useState, useEffect} from 'react'
import i18next from "i18next"
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {withNamespaces} from 'react-i18next'

import {StyledAddButton, StyledTable, StyledTableCell, StyledTableHeadRow} from "assets/js/App"
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
import {StyledTableHeadTr} from "assets/js/library/components/table";
import {saveChangesMethod} from "./StateTableComponent.js";
import {Link} from "react-router-dom";

const useStyles = makeStyles(treeStyles)

function StateTableComponent({t, setOpenForm, ids, states, setStates, setIds, getStates, type}) {
    const classes = useStyles()
    const lang = i18next.language
    const [dynamicHeight, setDynamicHeight] = useState(0)
    const appContext = useContext(AppContext)
    const [collpase,setCollapse] = useState(false)

    const deleteState = (id) => {
        deleteStateMethod(id, t, states, appContext, setStates, setIds, getStates)
    }

    const changeTreeData = (e) => {
        setStates(prevState => {
            prevState = e
            return [...prevState]
        })
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id)
        })
    }

    const onToggleCollapse = (e) => {
        setCollapse(true)
        let currentCount = e.treeData.length
        let status = e.expanded
        if(e.node.children.length>0){
            currentCount = e.node.children.length
        }
        setDynamicHeight(prevState => {
            let exCount = parseInt(prevState)/63
            let newCount = status ? exCount + currentCount : exCount - currentCount
            return `${newCount * 63}px`
        })
    }

    useEffect(() => {
        if (!collpase && states !== undefined && states.length > 0) {
            let count = states.length
            setDynamicHeight(`${count * 63}px`)
        }
    }, [states])

    const saveChanges = () => {
        saveChangesMethod(t,appContext,states,type)
    }

    return (<Box>
            <StyledTable>
                <StyledTableHeadTr>
                    <StyledTableCell>{t(`taxonomy:${type.type}`)}</StyledTableCell>
                </StyledTableHeadTr>
                {states !== undefined && states.length > 0 ?
                    <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                        <SortableTree rowDirection={lang === "fa" ? "rtl" : "ltr"}
                                      treeData={states}
                                      className={classes.root}
                                      onChange={changeTreeData}
                                      onVisibilityToggle={onToggleCollapse}
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
            <StyledAddButton value="active" onClick={saveChanges}>
                {t('translation:register')}
            </StyledAddButton>
        </Box>
    )
}

export default withNamespaces('translation')(StateTableComponent)
