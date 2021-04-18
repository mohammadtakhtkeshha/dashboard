import {getPermissionList} from "core/services/role.service";
import {getRoles} from "core/services/user.service";

export const getPermissionsMethod = (appContext,setPermissions) => {
    appContext.setLoading(true)
    getPermissionList(appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const permissionsList = JSON.parse(response.data);
        setPermissions(permissionsList)
    });
}

export const constRole ={
    "role": "",
    "permissions": [
        {
            "permisssion":"delete any news content", "status":0
        },
        {
            "permisssion":"delete own news content", "status":0
        },
        {
            "permisssion":"edit any news content", "status":0
        },
        {
            "permisssion":"edit own news content", "status":0
        },
        {
            "permisssion":"create news content", "status":0
        },
        {
            "permisssion":"delete own images content", "status":0
        },
        {
            "permisssion":"delete any images content", "status":0
        },
        {
            "permisssion":"edit any images content", "status":0
        },
        {
            "permisssion":"edit own images content", "status":0
        },
        {
            "permisssion":"create images content", "status":0
        },
        {
            "permisssion":"delete any sounds content", "status":0
        },
        {
            "permisssion":"delete own sounds content", "status":0
        },
        {
            "permisssion":"edit any sounds content", "status":0
        },
        {
            "permisssion":"edit own sounds content", "status":0
        },
        {
            "permisssion":"create sounds content", "status":0
        },
        {
            "permisssion":"delete any videos content", "status":0
        },
        {
            "permisssion":"delete own videos content", "status":0
        },
        {
            "permisssion":"edit any videos content", "status":0
        },
        {
            "permisssion":"edit own videos content", "status":0
        },
        {
            "permisssion":"create videos content", "status":0
        },
        {
            "permisssion":"delete any article content", "status":0
        },
        {
            "permisssion":"delete own article content", "status":0
        },
        {
            "permisssion":"edit any article content", "status":0
        },
        {
            "permisssion":"edit own article content", "status":0
        },
        {
            "permisssion":"create article content", "status":0
        },
        {
            "permisssion":"create terms in category", "status":0
        },
        {
            "permisssion":"edit terms in category", "status":0
        },
        {
            "permisssion":"delete terms in category", "status":0
        },
        {
            "permisssion":"create terms in images category", "status":0
        },
        {
            "permisssion":"edit terms in images category", "status":0
        },
        {
            "permisssion":"delete terms in images category", "status":0
        },
        {
            "permisssion":"create terms in sounds category", "status":0
        },
        {
            "permisssion":"edit terms in sounds category", "status":0
        },
        {
            "permisssion":"delete terms in sounds category", "status":0
        },
        {
            "permisssion":"create terms in videos category", "status":0
        },
        {
            "permisssion":"edit terms in videos category", "status":0
        },
        {
            "permisssion":"delete terms in videos category", "status":0
        },
        {
            "permisssion":"administer users", "status":0
        },
        {
            "permisssion":"administer menu", "status":0
        },
        {
            "permisssion":"access tickets", "status":0
        },
        {
            "permisssion":"access reports", "status":0
        }
    ]
}

export const defaultConstRole ={
    "role": "",
    "permissions": [
        {
            "permisssion":"delete any news content", "status":0
        },
        {
            "permisssion":"delete own news content", "status":0
        },
        {
            "permisssion":"edit any news content", "status":0
        },
        {
            "permisssion":"edit own news content", "status":0
        },
        {
            "permisssion":"create news content", "status":0
        },
        {
            "permisssion":"delete own images content", "status":0
        },
        {
            "permisssion":"delete any images content", "status":0
        },
        {
            "permisssion":"edit any images content", "status":0
        },
        {
            "permisssion":"edit own images content", "status":0
        },
        {
            "permisssion":"create images content", "status":0
        },
        {
            "permisssion":"delete any sounds content", "status":0
        },
        {
            "permisssion":"delete own sounds content", "status":0
        },
        {
            "permisssion":"edit any sounds content", "status":0
        },
        {
            "permisssion":"edit own sounds content", "status":0
        },
        {
            "permisssion":"create sounds content", "status":0
        },
        {
            "permisssion":"delete any videos content", "status":0
        },
        {
            "permisssion":"delete own videos content", "status":0
        },
        {
            "permisssion":"edit any videos content", "status":0
        },
        {
            "permisssion":"edit own videos content", "status":0
        },
        {
            "permisssion":"create videos content", "status":0
        },
        {
            "permisssion":"delete any article content", "status":0
        },
        {
            "permisssion":"delete own article content", "status":0
        },
        {
            "permisssion":"edit any article content", "status":0
        },
        {
            "permisssion":"edit own article content", "status":0
        },
        {
            "permisssion":"create article content", "status":0
        },
        {
            "permisssion":"create terms in category", "status":0
        },
        {
            "permisssion":"edit terms in category", "status":0
        },
        {
            "permisssion":"delete terms in category", "status":0
        },
        {
            "permisssion":"create terms in images category", "status":0
        },
        {
            "permisssion":"edit terms in images category", "status":0
        },
        {
            "permisssion":"delete terms in images category", "status":0
        },
        {
            "permisssion":"create terms in sounds category", "status":0
        },
        {
            "permisssion":"edit terms in sounds category", "status":0
        },
        {
            "permisssion":"delete terms in sounds category", "status":0
        },
        {
            "permisssion":"create terms in videos category", "status":0
        },
        {
            "permisssion":"edit terms in videos category", "status":0
        },
        {
            "permisssion":"delete terms in videos category", "status":0
        },
        {
            "permisssion":"administer users", "status":0
        },
        {
            "permisssion":"administer menu", "status":0
        },
        {
            "permisssion":"access tickets", "status":0
        },
        {
            "permisssion":"access reports", "status":0
        }
    ]
}


export const getRolesMethod = (appContext, setFaRoles, setEnRoles) => {
    appContext.setLoading(true)
    getRoles(appContext.handleError).then(response => {
        appContext.setLoading(false)
        const roles = response.data
        let enRoles = []
        let faRoles = []
        for (let role in roles) {
            enRoles.push(role)
            faRoles.push(roles[role])
        }
        setFaRoles(faRoles)
        setEnRoles(enRoles)
    })
}
