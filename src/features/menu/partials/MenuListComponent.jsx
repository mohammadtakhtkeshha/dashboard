import React, {useContext, useEffect, useState} from 'react'
import i18next from "i18next"
import {withNamespaces} from 'react-i18next'
import SortableTree from 'react-sortable-tree';

import {makeStyles} from "@material-ui/core/styles"

import {
    StyledTreeRow,
    StyledTypographyTitle,
    treeStyles
} from "assets/js/library/pages/treeBlock"
import {warning} from "methods/swal"
import {deleteMenuMethod,saveChangesMethod} from "./MenuListComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledTable,
    StyledTableCell,
    StyledActionsBlock,
    StyledActionButtons,
    StyledTreeTable,
    StyledAddButton
} from "assets/js/App"
import {StyledTableHeadTr} from "assets/js/library/components/table";
import {useLocation} from "react-router-dom"
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app

const useStyles = makeStyles(treeStyles)

function MenuListComponent({t, setOpenForm, menus, setMenus, getMenus}) {
    const classes = useStyles()
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const location=useLocation()
    const [dynamicHeight, setDynamicHeight] = useState(0)
    const [collpase,setCollapse] = useState(false)
    const mobileOrWeb = location.pathname.split('/').pop() === "mobile" ? "mobile-menu" : "main"

    const changeTreeData = (e) => {
        setMenus(prevState => {
            prevState = e
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

    const saveChanges = () => {
        saveChangesMethod(t,appContext,menus,mobileOrWeb)
    }

    const setCurrentDynamicHeigh = () => {
        if (!collpase && menus !== undefined && menus.length > 0) {
            let count = menus.length
            for (let item of menus) {
                if (item.children > 0) {
                    count = count + item.children.length
                    for (let part of item) {
                        if (part.children > 0) {
                            count = count + item.children.length
                        }
                    }
                }
            }
            setDynamicHeight(`${count * 63}px`)
        }
    }

    useEffect(setCurrentDynamicHeigh, [menus]);

    return (<>
            <StyledTable>
                <StyledTableHeadTr>
                    <StyledTableCell>{t('menu:menuList')}</StyledTableCell>
                </StyledTableHeadTr>
                {menus !== undefined &&
                menus.length > 0 ?
                    <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                        <SortableTree
                            rowDirection={lang === "fa" ? "rtl" : "ltr"}
                            treeData={menus}
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
                                            <StyledActionButtons value={node.entity_id} onClick={confirmDeleteHandler}>
                                                <img src={deleteIcon} alt=""/>
                                            </StyledActionButtons>
                                            <StyledActionButtons value={node.entity_id} onClick={() => {
                                                setOpenForm({show: true, id: node.entity_id})
                                            }}>
                                                <img src={editIcon} alt=""/>
                                            </StyledActionButtons>
                                        </StyledActionsBlock>
                                    </StyledTreeRow>
                                ),
                            })}
                        />
                    </StyledTreeTable> : ""}
            </StyledTable>
            <StyledAddButton value="active" onClick={saveChanges}>
                {t('translation:register')}
            </StyledAddButton>
        </>
    )
}

export default withNamespaces('translation,menu')(MenuListComponent)
