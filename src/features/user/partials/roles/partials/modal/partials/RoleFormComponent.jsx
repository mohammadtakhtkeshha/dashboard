import React, {useContext, useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import {Box, Grid, Typography} from "@material-ui/core"
import {
    StyledInput,
    StyledTypographyError
} from "assets/js/App"
import {StyledFooter} from "assets/js/comment/commentForm"
import i18next from "i18next"
import {StyledChoosePermission, StyledPermissionsList} from "assets/js/library/pages/user/roleForm"
import {grey} from "assets/js/library/abstracts/colors"
import AppContext from "contexts/AppContext"

import {
    StyledPermissionButtonsBlock,
    StyledDisactiveButton,
    StyledStrictButton,
    StyledPermissionBlock,
    StyledCompleteButton,
    StyledInsideModal,
    StyledFirstRowPermission,
    StyledPermissionName,
} from "assets/js/library/pages/user/roles"
import {StyledModalBody, StyledModalHeader} from "assets/js/library/components/modal"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent"
import {
    editAndAddRoleMethod,
    handleChangeNameMethod,
    clickPermissionButtonMethod,
    changePermissionCheckBoxMethod,
    selectedButtonMethod
} from "./RoleFormComponent.js"

function RoleFormComponent({t, openForm, handleClose, permissions, role, setRole, setShowPermission,showPermission, faRoles, setFaRoles, setEnRoles}) {
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [error, setError] = useState({required: true, unique: false})

    const handleChangeName = (e) => {
        handleChangeNameMethod(e, setRole, setError, faRoles)
    }

    const editAndAddRole = (e) => {
        editAndAddRoleMethod(t, e, appContext, role, faRoles, openForm.id, error, handleClose, setFaRoles, setEnRoles)
    }

    const clickPermissionButton = (e) => {
        clickPermissionButtonMethod(e, setShowPermission,permissions,setRole)
    }

    const changePermissionCheckBox = (e) => {
        changePermissionCheckBoxMethod(e, setRole,permissions,setShowPermission)
    }

    const selectedButton = () => {
        selectedButtonMethod(permissions, setShowPermission,role)
    }

    const handleError = () => {
        if (role.role.length > 0) {
            setError({required: false, unique: false})
        } else {
            setError({required: true, unique: false})
        }
    }

    useEffect(selectedButton(), [permissions])

    useEffect(handleError(), [role])

    const checkIncludes = (arr,value) => {
        for(let item of arr){
            if(item.permisssion === value){
                return item.status
            }

        }
    }

    return (<>
        <StyledModalHeader>{openForm.id === "" ? t('roles:newRole') : t('roles:editRole')}</StyledModalHeader>
        <StyledModalBody>
            <StyledInsideModal>
                <Grid container>
                    <Grid item xs={12}>
                        <StyledInput className="subject"
                                     placeholder={t('translation:name')}
                                     value={role.role}
                                     border={(error.unique || error.required) ? 'red' : grey[0]}
                                     onChange={handleChangeName}/>
                        {error.required &&
                        <StyledTypographyError>{t('translation:requiredValid')}</StyledTypographyError>}
                        {error.unique &&
                        <StyledTypographyError>{t('translation:uniqueValidation')}</StyledTypographyError>}
                    </Grid>
                    <Grid item xs={12}>
                        {(permissions.length > 0 && showPermission.length > 0) && permissions.map((permission, i) => {
                            return (<StyledPermissionBlock key={i}>
                                <StyledFirstRowPermission>
                                    <StyledPermissionName>{permission.groupName}</StyledPermissionName>
                                    <StyledPermissionButtonsBlock>
                                        <StyledCompleteButton value={`complete-${i}-${permission.groupName}`}
                                                              status={showPermission[i].status === 'complete' && showPermission[i].index === i}
                                                              onClick={clickPermissionButton}>
                                            {t('translation:complete')}
                                        </StyledCompleteButton>
                                        <StyledStrictButton value={`strict-${i}-${permission.groupName}`}
                                                            status={showPermission[i].status === 'strict' && showPermission[i].index === i}
                                                            onClick={clickPermissionButton}>
                                            {t('translation:strict')}
                                        </StyledStrictButton>
                                        <StyledDisactiveButton value={`disactive-${i}-${permission.groupName}`}
                                                               status={showPermission[i].status === 'disactive' && showPermission[i].index === i}
                                                               onClick={clickPermissionButton}>
                                            {t('translation:notActive')}
                                        </StyledDisactiveButton>
                                    </StyledPermissionButtonsBlock>
                                </StyledFirstRowPermission>
                                <StyledChoosePermission
                                    show={showPermission[i].index === i && showPermission[i].status === "strict"}>
                                    {permission.subGroups.map((item, index) => {
                                        return (<StyledPermissionsList key={index}>
                                            <Typography variant="subtitle1">{item.subGroupName}</Typography>
                                            <Box>
                                                {item.permissions.map((item, index) => {
                                                    return (<div key={index}>
                                                        <StyledCheckboxComponent label={item.label}
                                                                                 value={item.permission}
                                                                                 checked={checkIncludes(role.permissions,item.permission)}
                                                                                 change={changePermissionCheckBox}/>
                                                    </div>)
                                                })}
                                            </Box>
                                        </StyledPermissionsList>)
                                    })}
                                </StyledChoosePermission>
                            </StyledPermissionBlock>)
                        })}
                    </Grid>
                </Grid>
            </StyledInsideModal>
        </StyledModalBody>
        <StyledFooter lang={lang}>
            <button value={openForm.id} onClick={editAndAddRole}>{t('translation:register')}</button>
            <button onClick={handleClose}>{t('translation:cancel')}</button>
        </StyledFooter>
    </>)
}

export default withNamespaces('translation,comments')(RoleFormComponent)
