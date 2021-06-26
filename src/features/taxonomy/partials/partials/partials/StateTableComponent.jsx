import React, {useContext, useEffect,useState} from 'react';
import i18next from 'i18next';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import {makeStyles} from '@material-ui/core/styles';
import {withNamespaces} from 'react-i18next';

import {StyledAddButton, StyledTable, StyledTableCell} from 'assets/js/App';
import {StyledActionsBlock, StyledActionButtons, StyledTreeTable} from 'assets/js/App';
import {warning} from 'methods/swal';
import {deleteStateMethod} from './StateTableComponent.js';
import SortableTree from 'react-sortable-tree';
import {StyledTreeRow, StyledTypographyTitle, treeStyles} from 'assets/js/library/pages/treeBlock';
import AppContext from 'contexts/AppContext';
import deleteIcon from 'assets/svg/delete.png';
import editIcon from 'assets/svg/edit.png';
import {StyledTableHeadTr} from 'assets/js/library/components/table';
import {saveChangesMethod} from './StateTableComponent.js';
import {get} from "libraries/local-storage";

const useStyles = makeStyles(treeStyles);

function StateTableComponent({t, setOpenForm, setDynamicHeight, dynamicHeight, states, setStates, setIds, getStates, type}) {
    const classes = useStyles();
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER))
    const [delPermission, setDelPermission] = useState('')
    const [editPermission, setEditPermission] = useState('')

    const deleteState = id => {
        deleteStateMethod(id, states, setLoading, setStates, setIds, getStates);
    };

    const changeTreeData = e => {
        setStates(prevState => {
            prevState = e;
            return [...prevState];
        });
        changeHeight(e)
    };

    const changeHeight = (e) => {
        let currentCount = e.length;
        const addToHeight = (children) => {
            for (let state of children) {
                if (state.expanded === true) {
                    currentCount = currentCount + state.children.length
                    if (state.children) {
                        if (state.children.length > 0) {
                            addToHeight(state.children)
                        }
                    }
                }
            }
        }
        addToHeight(e)
        setDynamicHeight(`${currentCount * 63}px`);
    };

    const confirmDeleteHandler = e => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id);
        });
    };

    const saveChanges = () => {
        saveChangesMethod(setLoading, states, type);
    };

    useEffect(() => {
        switch (type.type) {
            case 'category':
                setDelPermission(permissions['delete terms in category'].access)
                setEditPermission(permissions['edit terms in category'].access)
                break;
            case 'images_category':
                setDelPermission(permissions['delete terms in images_category'].access)
                setEditPermission(permissions['edit terms in images_category'].access)
                break;
            case 'sounds_category':
                setDelPermission(permissions['delete terms in sounds_category'].access)
                setEditPermission(permissions['edit terms in sounds_category'].access)
                break;
            case 'state':
                setDelPermission(permissions['delete terms in state'].access)
                setEditPermission(permissions['edit terms in state'].access)
                break;
            case 'tags':
                setDelPermission(permissions['delete terms in tags'].access)
                setEditPermission(permissions['edit terms in tags'].access)
                break;
            default: //'videos_category'
                setDelPermission(permissions['delete terms in videos_category'].access)
                setEditPermission(permissions['edit terms in videos_category'].access)
        }
    }, [])
    console.log(permissions['edit terms in videos_category'].access)
    return (<>
        <StyledTable>
            <StyledTableHeadTr>
                <StyledTableCell>{t(`taxonomy:${type.type}`)}</StyledTableCell>
            </StyledTableHeadTr>
            {states !== undefined && states.length > 0 ? (
                <StyledTreeTable style={{height: dynamicHeight}} lang={lang}>
                    <SortableTree
                        rowDirection={lang === 'fa' ? 'rtl' : 'ltr'}
                        treeData={states}
                        className={classes.root}
                        onChange={changeTreeData}
                        generateNodeProps={({node, path}) => ({
                            title: (
                                <StyledTreeRow>
                                    <StyledTypographyTitle>{node.title}</StyledTypographyTitle>
                                    <StyledActionsBlock>
                                        <StyledActionButtons
                                            permission={delPermission}
                                            value={node.id}
                                            onClick={confirmDeleteHandler}>
                                            <img src={deleteIcon} alt=""/>
                                        </StyledActionButtons>
                                        <StyledActionButtons
                                            permission={editPermission}
                                            value={node.id}
                                            onClick={() => {
                                                setOpenForm({show: true, id: node.id});
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
                ''
            )}
        </StyledTable>
        <StyledAddButton value="active" onClick={saveChanges}>
            {t('translation:register')}
        </StyledAddButton>
    </>);
}

export default withNamespaces('translation')(StateTableComponent);
