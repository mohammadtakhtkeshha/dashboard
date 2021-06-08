import React, {useContext, useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import {Box, Grid, Typography} from "@material-ui/core"
import {
    StyledInput, StyledModalFooter,
    StyledTypographyError
} from "assets/js/App"
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
    handleErrorMethod,
    checkIncludes,
    selectedButtonMethod
} from "./RoleFormComponent.js"
import {StyledRegisterButton} from "assets/js/library/components/buttons";

function RoleFormComponent({t, openForm, handleClose, permissions, role, setRole, setShowPermission, showPermission, faRoles, setFaRoles, setEnRoles}) {
    const {setLoading} = useContext(AppContext)
    const [error, setError] = useState({required: true, unique: false})

    const handleChangeName = (e) => {
        handleChangeNameMethod(e, setRole, setError, faRoles)
    }

    const editAndAddRole = (e) => {
        editAndAddRoleMethod( e, setLoading, role, faRoles, openForm.id, error, handleClose, setFaRoles, setEnRoles)
    }

    const clickPermissionButton = (e) => {
        clickPermissionButtonMethod(e, setShowPermission, permissions, setRole)
    }

    const changePermissionCheckBox = (e) => {
        changePermissionCheckBoxMethod(e, setRole, permissions, setShowPermission)
    }

    useEffect(() => {
        selectedButtonMethod(permissions, setShowPermission)
    }, [permissions, setShowPermission])

    useEffect(() => {
        handleErrorMethod(role.role.length,setError)
    }, [role.role.length,setError])//Once

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
                    <Grid item xs={12} >
                        {(permissions.length > 0 && showPermission.length > 0) && permissions.map((permission, i) => {
                            return (<StyledPermissionBlock key={i} >
                                <StyledFirstRowPermission className={`status-${i}`}>
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
                                                                                 checked={checkIncludes(role.permissions, item.permission)}
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
        <StyledModalFooter>
            <StyledRegisterButton status={error.required === false && error.unique === false} onClick={editAndAddRole}>
                {t('translation:register')}
            </StyledRegisterButton>
            <button onClick={handleClose}>{t('translation:cancel')}</button>
        </StyledModalFooter>
    </>)
}

export default withNamespaces('translation,comments')(RoleFormComponent)
