import React, {useContext} from "react"
import {withNamespaces} from "react-i18next"

import AppContext from "contexts/AppContext"
import {
    StyledTableBody,
    StyledTableBodyRow,
    StyledActionButtons,
    StyledActionsBlock,
} from "assets/js/App"
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledTableCell
} from "assets/js/library/components/table"
import {deleteRoleMethod,showEditFormMethod} from "./RoleTableComponent.js"
import {warning} from "methods/swal"
import deleteIcon from "assets/svg/delete.png"
import editIcon from "assets/svg/edit.png"
import i18next from "i18next"

function RoleTableComponent({t, openForm, setOpenForm,setShowPermission,permissions, setRole,enRoles,faRoles,setEnRoles,setFaRoles}) {
    const appContext = useContext(AppContext)

    const lang = i18next.language
    let align = lang === "en" ? "left" : "right"

    const confirmDeleteHandler = (e) => {
        const currentRole = e.currentTarget.value
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteRoleMethod(t, currentRole, appContext, setFaRoles, setEnRoles, enRoles, faRoles)
        })
    }

    const showEditForm = (e) => {
        showEditFormMethod(e,appContext,setRole,setOpenForm,setShowPermission,permissions)
    }

    return (<StyledTable>
            <StyledTableHeadTr>
                <StyledTableCell width="95" minWidth={55} align={align}>{t('translation:name')}</StyledTableCell>
                <StyledTableCell width="5" minWidth={55} align={align}>فعالیت</StyledTableCell>
            </StyledTableHeadTr>
            <StyledTableBody>
                {faRoles.length > 0 ? (faRoles.map((role, index) =>
                    (<React.Fragment key={index}>
                        <StyledTr>
                            <StyledTableCell width="95" minWidth={55} align={align}>
                                {faRoles[index]}
                            </StyledTableCell>
                            <StyledTableCell width="5" minWidth={55} align="center">
                                <StyledActionsBlock>
                                    <StyledActionButtons value={enRoles[index]} onClick={confirmDeleteHandler}>
                                        <img src={deleteIcon} alt={enRoles[index]}/>
                                    </StyledActionButtons>
                                    <StyledActionButtons value={enRoles[index]} onClick={showEditForm}>
                                        <img src={editIcon} alt={enRoles[index]}/>
                                    </StyledActionButtons>
                                </StyledActionsBlock>
                            </StyledTableCell>
                        </StyledTr>
                    </React.Fragment>)
                )) : (<StyledTableBodyRow>
                    <StyledTableCell colSpan="6" align="right">{t('translation:notFoundRecord')}
                    </StyledTableCell>
                </StyledTableBodyRow>)}
            </StyledTableBody>
        </StyledTable>)
}

export default withNamespaces('translation,roles')(RoleTableComponent)
