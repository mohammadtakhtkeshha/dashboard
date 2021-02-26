import {getPermissionList, addRole, deleteRole, editRole} from "../../../core/services/permission.service";

export const getPermissionsMethod = (appContext) => {
    getPermissionList(appContext.handleError).then((response) => {
        const permissionsList = JSON.parse(response.data);
        debugger
    });
}

export const addRoleMethod = (appContext) => {
    const currentBody = {
        "role": "negar",
        "permissions": [
            {
                "permisssion": "delete any news content", "status": 1
            },
            {
                "permisssion": "delete own news content", "status": 1
            },
            {
                "permisssion": "edit any news content", "status": 1
            },
            {
                "permisssion": "edit own news content", "status": 1
            },
            {
                "permisssion": "create news content", "status": 1
            },
            {
                "permisssion": "delete own images content", "status": 0
            },
            {
                "permisssion": "edit any images content", "status": 0
            },
            {
                "permisssion": "edit own images content", "status": 0
            },
            {
                "permisssion": "create images content", "status": 0
            },
            {
                "permisssion": "delete any sounds content", "status": 0
            },
            {
                "permisssion": "delete own sounds content", "status": 0
            },
            {
                "permisssion": "edit any sounds content", "status": 0
            },
            {
                "permisssion": "edit own sounds content", "status": 0
            },
            {
                "permisssion": "create sounds content", "status": 0
            },
            {
                "permisssion": "delete any videos content", "status": 0
            },
            {
                "permisssion": "delete own videos content", "status": 0
            },
            {
                "permisssion": "edit any videos content", "status": 0
            },
            {
                "permisssion": "edit own videos content", "status": 0
            },
            {
                "permisssion": "create videos content", "status": 0
            },
            {
                "permisssion": "delete any article content", "status": 0
            },
            {
                "permisssion": "delete own article content", "status": 0
            },
            {
                "permisssion": "edit any article content", "status": 0
            },
            {
                "permisssion": "edit own article content", "status": 0
            },
            {
                "permisssion": "create article content", "status": 0
            },
            {
                "permisssion": "create terms in category", "status": 0
            },
            {
                "permisssion": "edit terms in category", "status": 0
            },
            {
                "permisssion": "delete terms in category", "status": 0
            },
            {
                "permisssion": "create terms in images category", "status": 0
            },
            {
                "permisssion": "edit terms in images category", "status": 0
            },
            {
                "permisssion": "delete terms in images category", "status": 0
            },
            {
                "permisssion": "create terms in sounds category", "status": 0
            },
            {
                "permisssion": "edit terms in sounds category", "status": 0
            },
            {
                "permisssion": "delete terms in sounds category", "status": 0
            },
            {
                "permisssion": "create terms in videos category", "status": 0
            },
            {
                "permisssion": "edit terms in videos category", "status": 0
            },
            {
                "permisssion": "delete terms in videos category", "status": 0
            },
            {
                "permisssion": "administer users", "status": 0
            },
            {
                "permisssion": "administer menu", "status": 0
            },
            {
                "permisssion": "access tickets", "status": 0
            },
            {
                "permisssion": "access reports", "status": 0
            }
        ]
    }
    addRole(appContext.handleError, currentBody).then((response) => {
        const permissionsList = JSON.parse(response.data);
        debugger
    });
}

export const editRoleMethod = (appContext) => {
    const currentBody = {
        "role": "negar",
        "permissions": [
            {
                "permisssion": "delete any news content", "status": 1
            },
            {
                "permisssion": "delete own news content", "status": 1
            },
            {
                "permisssion": "edit any news content", "status": 1
            },
            {
                "permisssion": "edit own news content", "status": 1
            },
            {
                "permisssion": "create news content", "status": 1
            },
            {
                "permisssion": "delete own images content", "status": 0
            },
            {
                "permisssion": "edit any images content", "status": 0
            },
            {
                "permisssion": "edit own images content", "status": 0
            },
            {
                "permisssion": "create images content", "status": 0
            },
            {
                "permisssion": "delete any sounds content", "status": 0
            },
            {
                "permisssion": "delete own sounds content", "status": 0
            },
            {
                "permisssion": "edit any sounds content", "status": 0
            },
            {
                "permisssion": "edit own sounds content", "status": 0
            },
            {
                "permisssion": "create sounds content", "status": 0
            },
            {
                "permisssion": "delete any videos content", "status": 0
            },
            {
                "permisssion": "delete own videos content", "status": 0
            },
            {
                "permisssion": "edit any videos content", "status": 0
            },
            {
                "permisssion": "edit own videos content", "status": 0
            },
            {
                "permisssion": "create videos content", "status": 0
            },
            {
                "permisssion": "delete any article content", "status": 0
            },
            {
                "permisssion": "delete own article content", "status": 0
            },
            {
                "permisssion": "edit any article content", "status": 0
            },
            {
                "permisssion": "edit own article content", "status": 0
            },
            {
                "permisssion": "create article content", "status": 0
            },
            {
                "permisssion": "create terms in category", "status": 0
            },
            {
                "permisssion": "edit terms in category", "status": 0
            },
            {
                "permisssion": "delete terms in category", "status": 0
            },
            {
                "permisssion": "create terms in images category", "status": 0
            },
            {
                "permisssion": "edit terms in images category", "status": 0
            },
            {
                "permisssion": "delete terms in images category", "status": 0
            },
            {
                "permisssion": "create terms in sounds category", "status": 0
            },
            {
                "permisssion": "edit terms in sounds category", "status": 0
            },
            {
                "permisssion": "delete terms in sounds category", "status": 0
            },
            {
                "permisssion": "create terms in videos category", "status": 0
            },
            {
                "permisssion": "edit terms in videos category", "status": 0
            },
            {
                "permisssion": "delete terms in videos category", "status": 0
            },
            {
                "permisssion": "administer users", "status": 0
            },
            {
                "permisssion": "administer menu", "status": 0
            },
            {
                "permisssion": "access tickets", "status": 0
            },
            {
                "permisssion": "access reports", "status": 0
            }
        ]
    }
    editRole(currentBody.role, currentBody, appContext.handleError).then((response) => {
        const permissionsList = JSON.parse(response.data);
        debugger
    });
}

export const deleteRoleMethod = (appContext) => {
    const currentBody = {
        "role": "negar",
        "permissions": [
            {
                "permisssion": "delete any news content", "status": 1
            },
            {
                "permisssion": "delete own news content", "status": 1
            },
            {
                "permisssion": "edit any news content", "status": 1
            },
            {
                "permisssion": "edit own news content", "status": 1
            },
            {
                "permisssion": "create news content", "status": 1
            },
            {
                "permisssion": "delete own images content", "status": 0
            },
            {
                "permisssion": "edit any images content", "status": 0
            },
            {
                "permisssion": "edit own images content", "status": 0
            },
            {
                "permisssion": "create images content", "status": 0
            },
            {
                "permisssion": "delete any sounds content", "status": 0
            },
            {
                "permisssion": "delete own sounds content", "status": 0
            },
            {
                "permisssion": "edit any sounds content", "status": 0
            },
            {
                "permisssion": "edit own sounds content", "status": 0
            },
            {
                "permisssion": "create sounds content", "status": 0
            },
            {
                "permisssion": "delete any videos content", "status": 0
            },
            {
                "permisssion": "delete own videos content", "status": 0
            },
            {
                "permisssion": "edit any videos content", "status": 0
            },
            {
                "permisssion": "edit own videos content", "status": 0
            },
            {
                "permisssion": "create videos content", "status": 0
            },
            {
                "permisssion": "delete any article content", "status": 0
            },
            {
                "permisssion": "delete own article content", "status": 0
            },
            {
                "permisssion": "edit any article content", "status": 0
            },
            {
                "permisssion": "edit own article content", "status": 0
            },
            {
                "permisssion": "create article content", "status": 0
            },
            {
                "permisssion": "create terms in category", "status": 0
            },
            {
                "permisssion": "edit terms in category", "status": 0
            },
            {
                "permisssion": "delete terms in category", "status": 0
            },
            {
                "permisssion": "create terms in images category", "status": 0
            },
            {
                "permisssion": "edit terms in images category", "status": 0
            },
            {
                "permisssion": "delete terms in images category", "status": 0
            },
            {
                "permisssion": "create terms in sounds category", "status": 0
            },
            {
                "permisssion": "edit terms in sounds category", "status": 0
            },
            {
                "permisssion": "delete terms in sounds category", "status": 0
            },
            {
                "permisssion": "create terms in videos category", "status": 0
            },
            {
                "permisssion": "edit terms in videos category", "status": 0
            },
            {
                "permisssion": "delete terms in videos category", "status": 0
            },
            {
                "permisssion": "administer users", "status": 0
            },
            {
                "permisssion": "administer menu", "status": 0
            },
            {
                "permisssion": "access tickets", "status": 0
            },
            {
                "permisssion": "access reports", "status": 0
            }
        ]
    }
    deleteRole(currentBody.role, appContext.handleError).then((response) => {
        debugger
        const permissionsList = JSON.parse(response.data);
        debugger
    });
}
