import React, {useContext, useEffect, useState} from 'react'
import i18next from "i18next"
import {withNamespaces} from 'react-i18next'
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"

import SortableTree from 'react-sortable-tree';
import {
    StyledTreeRow,
    StyledTypographyTitle,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import {warning} from "methods/swal"
import {deleteMenuMethod} from "./MenuListComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledTable,
    StyledTableCell,
    StyledTableHeadRow,
    StyledActionsBlock,
    StyledActionButtons,
    StyledTreeTable
} from "assets/js/App"
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"

const useStyles = makeStyles(treeStyles)

function MenuListComponent({t, setOpenForm, menus, chunks, page, setMenus, handlePagination, setTotalPage, setChunks, getMenus}) {
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
        deleteMenuMethod(id, t, appContext, getMenus)
    }

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteMenu(id)
        });
    }

    useEffect(() => {
        if (chunks[page] !== undefined && chunks[page].length > 0) {
            let count = chunks[page].length
            for(let item of chunks[page]){
                if(item.children>0){
                    count=count+item.children.length
                   for(let part of item){
                       if(part.children > 0){
                           count=count+item.children.length
                       }
                   }
                }
            }
            setDynamicHeight(`${count * 63}px`)
        }
    }, [chunks])

    return (<Box>
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell>{t('menu:menuList')}</StyledTableCell>
                </StyledTableHeadRow>
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
                                    <StyledTreeRow>
                                        <StyledTypographyTitle>
                                            {node.title}
                                        </StyledTypographyTitle>
                                        <StyledActionsBlock>
                                            <StyledActionButtons value={node.entity_id} onClick={confirmDeleteHandler}>
                                                <img src={deleteIcon} alt=""/>
                                            </StyledActionButtons>
                                            <StyledActionButtons value={node.entity_id} onClick={() => {
                                                setOpenForm({show: true, id: node.entity_id})}}>
                                                <img src={editIcon} alt=""/>
                                            </StyledActionButtons>
                                        </StyledActionsBlock>
                                    </StyledTreeRow>
                                ),
                            })}
                        />
                    </StyledTreeTable> : ""}
            </StyledTable>
        </Box>
    )
}

export default withNamespaces('translation,menu')(MenuListComponent)


