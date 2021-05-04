import { nameValidation, mailValidation } from "features/user/partials/modal/partials/NewUserComponent";
import { getNotPaginateUser, getUser } from "core/services/user.service";

export const handleChangeMethod = (t, e, user, field, setUser, setErrors, userNameList, mailList) => {
    const currentValue = e.currentTarget.value
    setUser(prevState => {
        return {
            ...prevState, [field]: [{ value: currentValue }]
        }
    })
    if (field === 'name') {
        nameValidation(currentValue, user.user_name, userNameList, setErrors, t)
    }
    if (field === 'mail') {
        mailValidation(currentValue, user.mail, mailList, setErrors)
    }
}

export const getUsers = (appContext, setUserNameList, setMailList) => {
    appContext.setLoading(true)
    getNotPaginateUser(appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const users = response.data
        let userNameList = []
        let userMailList = []
        for (let user of users) {
            userNameList.push(user.user_name)
            userMailList.push(user.mail)
        }
        setUserNameList(userNameList)
        setMailList(userMailList)
    })
}

export const getUserMethod = (appContext,id, setUser, setDefaultRoles) => {
    appContext.setLoading(true)
    getUser(id, appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const item = response.data
        let roles = item.roles
        let keyRolesArr = []
        for (let role of roles) {
            keyRolesArr.push(role.target_id)
        }
        setDefaultRoles([...keyRolesArr])
        let currentEditedUser = {
            field_last_name: item.field_last_name.length > 0 ? item.field_last_name : "",
            field_name: item.field_name.length > 0 ? item.field_name : "",
            mail: item.mail,
            name: item.name,
            roles: item.roles,
            status: item.status,
            uid: [{ value: `${item.uid[0].value}` }],
            user_picture: item.user_picture.length > 0 ? item.user_picture : "",
        }
        setUser(currentEditedUser)
    })
}

export const constUser = {
    "name": [
        {
            "value": ""
        }
    ],
    "mail": [
        {
            "value": ""
        }
    ],
    "status": [
        {
            "value": false
        }
    ],
    "roles": [
        { target_id: "rest_user", target_type: "user_role" }
    ],
    "field_last_name": [
        {
            "value": ""
        }
    ],
    "field_name": [
        {
            "value": ""
        }
    ],
    "user_picture": [],
    "field_fa_role": [
        {
            "value": ""
        }
    ],
}
