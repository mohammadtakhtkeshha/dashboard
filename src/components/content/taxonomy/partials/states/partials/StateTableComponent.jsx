import React, {useContext} from 'react'
import i18next from "i18next"

import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import {withStyles, makeStyles} from "@material-ui/core/styles"
import {Box, Grid, Typography} from "@material-ui/core"
import {withNamespaces} from 'react-i18next'

import {styledTreeItem,
    styledTreeView,
    styledGridItem,
    styledGridItemAction,
    StyledActionTitle,
    StyledActionButtonBlockWithPadding} from "assets/js/taxonomy/stateTable"

import {
    StyledDeleteButton,
    StyledEditButton,
    StyledActionButtonBlock,
    StyledRegisterButton,
    StyledRelative, StyledTableBody
} from "assets/js/App"
import {isObjectEmpty} from "methods/commons"
import {warning} from "methods/swal"
import {deleteStateMethod} from "./StateTableComponent.js"
import AppContext from "contexts/AppContext";

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
})

const StyledTreeItem = withStyles(styledTreeItem)(TreeItem)
const StyledTreeView = withStyles(styledTreeView)(TreeView)
const StyledGridItem = withStyles(styledGridItem)(Grid)
const StyledGridItemAction = withStyles(styledGridItemAction)(Grid)

function StateTableComponent({t, setOpenForm, ids, states, chunks, page, setStates,setIds,handlePagination}) {
    const classes = useStyles()
    const lang = i18next.language
    const appContext = useContext(AppContext)

    const clickEdit = (e) => {
        const id = e.currentTarget.value
        setOpenForm({show: true, id: id})
    }

    const deleteState = (id) => {
        deleteStateMethod(id, t, setStates, appContext, handlePagination, setIds)
    }

    const clickDelete = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteState(id)
        });
    }

    const label = (node) => (<Grid container>
        <StyledGridItem item>{node.title}</StyledGridItem>
        <StyledGridItemAction item>
            {node.id === "root" ? <StyledActionTitle>{t('translation:actions')}</StyledActionTitle> :
                <StyledActionButtonBlockWithPadding>
                    <StyledEditButton value={node.id} onClick={clickEdit}>
                        {t('translation:edit')}
                    </StyledEditButton>
                    <StyledDeleteButton value={node.id} onClick={clickDelete}>
                        {t('translation:delete')}
                    </StyledDeleteButton>
                </StyledActionButtonBlockWithPadding>
            }
        </StyledGridItemAction>
    </Grid>)

    const renderTree = (nodes) => (
        <StyledTreeItem lang={lang} color="red" key={nodes.id} nodeId={nodes.id} label={label(nodes)}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    )

    return (<Box>
            {chunks[page] !== undefined &&
            chunks[page].children.length > 0 ?
                   <div> {!isObjectEmpty(chunks[page]) ? <StyledTreeView
                        lang={lang}
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpanded={ids}
                        defaultExpandIcon={<ChevronRightIcon/>}>
                        {renderTree(chunks[page])}
                    </StyledTreeView>:<div></div>}
                   </div>
                : <div>{t('translation:notFoundRecord')}</div>
            }

        </Box>
    )
}

export default withNamespaces('translation')(StateTableComponent)
