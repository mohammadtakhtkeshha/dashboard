import React, {useContext, useEffect, useState} from 'react'
import i18next from "i18next"
import {withNamespaces} from 'react-i18next'
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"

import {StyledTreeTable} from "assets/js/library/layout/dragDrop"
import SortableTree from 'react-sortable-tree';
import {
    StyledTreeActionButtons,
    StyledTypographyTitle,
    StyledButtonsBlock,
    StyledButtonTree,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import {warning} from "methods/swal"
import {deleteMenuMethod} from "./MenuListComponent.js"
import AppContext from "contexts/AppContext"
import {StyledTable, StyledTableCell, StyledTableHeadRow} from "assets/js/App"
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"

const useStyles = makeStyles(treeStyles)

function MenuListComponent({t, setOpenForm, menus, chunks, page, setMenus, handlePagination, setTotalPage, setChunks,getMenus}) {
    const classes = useStyles()
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [dynamicHeight, setDynamicHeight] = useState(0)

    const changeTreeData = (e) => {
        setChunks(prevState => {
            prevState[page] = e
            return [...prevState]
        })
    }

    const deleteMenu = (id) => {
        deleteMenuMethod(id, t, appContext,getMenus)
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteMenu(id)
        });
    }

    useEffect(() => {
        if (chunks[page] !== undefined && chunks[page].length > 0) {
            setDynamicHeight(`${chunks[page].length * 63}px`)
        }
    }, [chunks])

    return (<Box>
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell>{t('menu:menuList')}</StyledTableCell>
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
                                        <StyledButtonTree value={node.entity_id} onClick={confirmDeleteHandler}><img
                                            src={deleteIcon} alt=""/></StyledButtonTree>
                                        <StyledButtonTree value={node.entity_id} onClick={() => {
                                            setOpenForm({show: true, id: node.entity_id})
                                        }}><img src={editIcon} alt=""/></StyledButtonTree>
                                    </StyledButtonsBlock>
                                </StyledTreeActionButtons>
                            ),
                        })}
                    />
                </StyledTreeTable> : ""}
        </Box>
    )
}

export default withNamespaces('translation,menu')(MenuListComponent)


