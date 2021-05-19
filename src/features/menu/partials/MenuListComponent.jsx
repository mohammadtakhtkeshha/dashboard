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

function MenuListComponent({t, setOpenForm, menus, setMenus, getMenus,dynamicHeight,setDynamicHeight}) {
    const classes = useStyles();
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const location=useLocation()
    const mobileOrWeb = location.pathname.split('/').pop() === "mobile" ? "mobile-menu" : "main"

    // const [collpase, setCollapse] = useState('');

    const changeTreeData = e => {
        setMenus(prevState => {
            prevState = e;
            return [...prevState];
        });
    };

    const deleteMenu = id => {
        deleteMenuMethod(id, setLoading, getMenus);
    };

    const confirmDeleteHandler = e => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteMenu(id);
        });
    };

    const onToggleCollapse = (e) => {
        let status = e.expanded;
        // setCollapse(status);
        let currentCount = e.treeData.length;
        if (e.node.children.length > 0) {
            currentCount = e.node.children.length;
        }

        setDynamicHeight(prevState => {
            let exCount = parseInt(prevState) / 63;
            let newCount ;
            if(status){
               newCount = exCount + currentCount
            }else{
               newCount = exCount - currentCount
            }
            setDynamicHeight(`${newCount * 63}px`);
        });
    };

    // const changingCollapse = () => {
    //     if ( !collpase && menus !== undefined && menus.length > 0) {
    //         let count = menus.length;
    //         for (let item of menus) {
    //             if (item.children > 0) {
    //                 count = count + item.children.length;
    //                 for (let part of item) {
    //                     if (part.children > 0) {
    //                         count = count + item.children.length;
    //                     }
    //                 }
    //             }
    //         }
    //         setDynamicHeight(`${count * 63}px`);
    //     }
    // }

    return (
        <>
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
                            onVisibilityToggle={onToggleCollapse}
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
            <StyledAddButton value="active" onClick={()=>saveChangesMethod(setLoading, menus, mobileOrWeb)}>
                {t('translation:register')}
            </StyledAddButton>
        </>
    );
}

export default withNamespaces('translation,menu')(MenuListComponent);
