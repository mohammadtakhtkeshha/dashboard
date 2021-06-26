import React, {useContext} from 'react';
import i18next from 'i18next';
import {withNamespaces} from 'react-i18next';
import SortableTree from 'react-sortable-tree';
import {useLocation} from "react-router-dom"

import {makeStyles} from '@material-ui/core/styles';

import {StyledTreeRow, StyledTypographyTitle, treeStyles} from 'assets/js/library/pages/treeBlock';
import {warning} from 'methods/swal';
import {deleteMenuMethod} from './MenuListComponent.js';
import AppContext from 'contexts/AppContext';
import {
    StyledTable,
    StyledTableCell,
    StyledActionsBlock,
    StyledActionButtons,
    StyledTreeTable,
} from 'assets/js/App';
import {StyledTableHeadTr} from 'assets/js/library/components/table';
import deleteIcon from 'assets/svg/delete.png';
import editIcon from 'assets/svg/edit.png';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css';
import {saveChangesMethod} from "./MenuListComponent.js"; // This only needs to be imported once in your app
import {StyledAddButton} from "assets/js/library/components/buttons";


const useStyles = makeStyles(treeStyles);

function MenuListComponent({t, setOpenForm, menus, setMenus, getMenus, dynamicHeight, setDynamicHeight}) {
    const classes = useStyles();
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const location = useLocation()
    const mobileOrWeb = location.pathname.split('/').pop() === "mobile" ? "mobile-menu" : "main"

    const deleteMenu = id => {
        deleteMenuMethod(id, setLoading, getMenus);
    };

    const confirmDeleteHandler = e => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteMenu(id);
        });
    };

    const changeTreeData = e => {
        setMenus(prevState => {
            prevState = e;
            return [...prevState];
        });
        changeHeight(e)
    }

    const changeHeight = (e) => {
        let currentCount = e.length;
        const addToHeight = (child) => {
            for (let menu of child) {
                if (menu.expanded === true) {
                    currentCount = currentCount + menu.children.length
                    if (menu.children) {
                        if (menu.children.length > 0) {
                            addToHeight(menu.children)
                        }
                    }
                }
            }
        }
        addToHeight(e)
        setDynamicHeight(`${currentCount * 63}px`);
    };

    return (<>
            <StyledTable>
                <StyledTableHeadTr>
                    <StyledTableCell>{t('menu:menuList')}</StyledTableCell>
                </StyledTableHeadTr>
                {menus !== undefined && menus.length > 0 ? (
                    <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                        <SortableTree
                            rowDirection={lang === 'fa' ? 'rtl' : 'ltr'}
                            treeData={menus}
                            className={classes.root}
                            onChange={changeTreeData}
                            generateNodeProps={({node, path}) => ({
                                title: (
                                    <StyledTreeRow>
                                        <StyledTypographyTitle>{node.title}</StyledTypographyTitle>
                                        <StyledActionsBlock>
                                            <StyledActionButtons value={node.entity_id} onClick={confirmDeleteHandler}>
                                                <img src={deleteIcon} alt=""/>
                                            </StyledActionButtons>
                                            <StyledActionButtons
                                                value={node.entity_id}
                                                onClick={() => {
                                                    setOpenForm({show: true, id: node.entity_id});
                                                }}>
                                                <img src={editIcon} alt=""/>
                                            </StyledActionButtons>
                                        </StyledActionsBlock>
                                    </StyledTreeRow>
                                ),
                            })}
                        />
                    </StyledTreeTable>
                ) : (
                    <StyledTreeRow>
                        <StyledTableCell colSpan="6" align="right">
                            {t('translation:notFoundRecord')}
                        </StyledTableCell>
                    </StyledTreeRow>
                )}
            </StyledTable>
            <StyledAddButton value="active" onClick={() => saveChangesMethod(setLoading, menus, mobileOrWeb)}>
                {t('translation:register')}
            </StyledAddButton>
        </>);
}

export default withNamespaces('translation,menu')(MenuListComponent);
