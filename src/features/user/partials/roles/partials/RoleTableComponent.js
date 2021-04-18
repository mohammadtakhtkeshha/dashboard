import {success, warning} from "methods/swal";
import {deleteRole, getRole} from "core/services/role.service";


export const deleteRoleMethod = (t, role, appContext, setFaRoles, setEnRoles, enRoles, faRoles) => {
    appContext.setLoading(true)
    deleteRole(appContext.handleError, role).then((response) => {
        success(t('translation:deletedSuccessfully'), t('translation:ok'))
        appContext.setLoading(false)
        const currentIndex = enRoles.indexOf(role)
        setFaRoles(prevState => {
            prevState.splice(currentIndex, 1)
            return [...prevState]
        })
        setEnRoles(prevState => {
            prevState.splice(currentIndex, 1)

            return [...prevState]
        })
    })
}

export const showEditFormMethod = (e, appContext, setRole, setOpenForm, setShowPermission, permissions) => {
    appContext.setLoading(true)
    const currentRole = e.currentTarget.value
    getRole(currentRole, appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const currentResponseRole = JSON.parse(response.data)
        setOpenForm({show: true, id: currentRole})
        // ------------------ const role -----------------
        let constRole = {
            "role": "",
            "permissions": [
                {
                    "permisssion": "delete any news content", "status": 0
                },
                {
                    "permisssion": "delete own news content", "status": 0
                },
                {
                    "permisssion": "edit any news content", "status": 0
                },
                {
                    "permisssion": "edit own news content", "status": 0
                },
                {
                    "permisssion": "create news content", "status": 0
                },
                {
                    "permisssion": "delete own images content", "status": 0
                },
                {
                    "permisssion": "delete any images content", "status": 0
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
        for (let item of currentResponseRole.permissions) {
            for (let curRole of constRole.permissions) {
                if (curRole.permisssion === item) {
                    curRole.status = 1
                }
            }
        }
        constRole.role = currentResponseRole.role
        setRole(constRole)

        // ------------- change const showPermission for switching between button complete,strict,disactive -------
        setShowPermission(prevState => {
            for (let per of currentResponseRole.permissions) {
                for (let index in permissions) {
                    let currentIndex = index
                    for (let permi of permissions[index].subGroups) {
                        for (let item of permi.permissions) {
                            if (per === item.permission) {
                                prevState[currentIndex].checked++
                                if(prevState[currentIndex].checked === prevState[currentIndex].num){
                                    prevState[currentIndex].status = 'complete'
                                }else if (prevState[currentIndex].checked>0){
                                    prevState[currentIndex].status = 'strict'
                                }else{
                                    prevState[currentIndex].status = 'disactive'
                                }
                            }
                        }
                    }
                }
            }
            return [...prevState]
        })
    })

}

