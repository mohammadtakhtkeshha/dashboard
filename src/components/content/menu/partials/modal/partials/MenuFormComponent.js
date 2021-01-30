import {addMenu} from "core/services/menu.service";
import {success} from "methods/swal";
import {getMenusMethod} from "../../../Index.js";


export const registerMethod = (appContext, body, openForm, getMenus, t, handlePagination, closeForm) => {
    appContext.setLoading(true)
    addMenu(appContext.handleError, body, openForm.id).then(response => {
        appContext.setLoading(false)
        getMenus()
        if (openForm.id === "") {//register
            success(t('translation:successRegistered'), t('translation:ok'))
        } else {//delete
            success(t('translation:successEdited'), t('translation:ok'))
        }
        closeForm()
    })
}

export const changeStatusMethod = (isChecked, setState,field) => {
    setState(prevState => {
        return {...prevState, [field]: [{value: isChecked}]}
    });
}

export const handleErrorsMethod = (setErrors, t, openForm) => {
    if (openForm.id === "") {//register
        setErrors({
            title: {required: t('translation:requiredValid')},
            link: {required: t('translation:requiredValid')}
        });
    }
}

export const changeParentMethod = (e, setState) => {
    const parentIds = e.map(menu => {
        return {value: menu.id}
    })
    setState(prevState => {
        return {...prevState, parent: parentIds}
    });
}

export const getParentAndItsIdsMethod = (id, menu, menus, setParentMenus) => {
    let parents = []
    let list = [...menus.children]
    for (let menu of list) {
        if (menu.id === id) {
            const index = list.indexOf(menu)
            list.splice(index, 1)
        }
    }
    for (let menu of list) {
        let idMenu = `menu_link_content:${menu.uuid}`
        let idAndName = {id: idMenu, name: menu.title}
        parents.push(idAndName)
        if (menu.children && menu.children.length > 0) {
            for (let item of menu.children) {
                let idValue = `menu_link_content:${item.uuid}`
                let idAndName = {id: idValue, name: item.title}
                parents.push(idAndName)
                if (item.children && item.children.length > 0) {
                    for (let part of item.children) {
                        let partId = `menu_link_content:${item.uuid}`
                        let idAndName = {id: partId, name: part.title}
                        parents.push(idAndName)
                    }
                }
            }
        }
    }
    setParentMenus(parents)
}

const linkValidation = (value, setErrors, t) => {
    let externalRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    let internalRegex = /^\/[a-zA-Z0-9]+/g;
    let externalRegexTest = externalRegex.test(value)
    let internalRegexTest = internalRegex.test(value)
    let regexValidation = externalRegexTest || internalRegexTest
    if (regexValidation) {
        setErrors(prevState => {
            delete prevState.link
            return {...prevState}
        })
    } else {
        setErrors(prevState => {
            prevState.link && delete prevState.link
            return {...prevState, link: {valid: t("menu:menuLinkValidation")}}
        })
    }
    return {internalRegexTest, externalRegexTest}
}

const titleValidation = (value, setErrors, t) => {
    if (value.length === 0) {
        setErrors(prevState => {
            return {...prevState, title: {required: t("translation:requiredValid")}}
        })
    } else {
        setErrors(prevState => {
            delete prevState.title
            return {...prevState}
        })
    }
}

export const handleChangeMethod = (e, field, setMenu, setErrors, t) => {
    let currentValue
    if(field === "link"){
        currentValue = e
    }else{
        currentValue = e.currentTarget.value
    }
    if (field === "link") {
        const {internalRegexTest, externalRegexTest} = linkValidation(currentValue, setErrors, t)
        if (internalRegexTest) {
            setMenu(prevState => {
                return {
                    ...prevState, [field]: [{uri: `internal:${currentValue}`}]
                }
            })
        } else {
            setMenu(prevState => {
                return {
                    ...prevState, [field]: [{uri: currentValue}]
                }
            })
        }
    } else if (field === "title") {
        titleValidation(currentValue, setErrors, t)
        setMenu(prevState => {
            return {
                ...prevState, [field]: [{value: currentValue}]
            }
        })
    } else {
        setMenu(prevState => {
            return {
                ...prevState, [field]: [{value: currentValue}]
            }
        })
    }
}

export const handleDefaultParentMethod = (menu, setSelectedParents, menus) => {

    let selectedParent = []
    if (menu.id) {
        if (menu.parent.length> 0) {
            let parentId = menu.parent[0].value.replace("menu_link_content:","")
            if (parentId !== null) {
                let value = ""
                function recursive(list) {
                    for (let item of list) {
                        if (item.uuid === parentId) {
                            value = item.title
                        } else {
                            if (item.children && item.children.length > 0) {
                                recursive(item.children)
                            }
                        }
                    }
                    return value
                }
                value = recursive(menus.children)
                for (let parent of menu.parent) {
                    selectedParent.push({id: parentId, name: value})
                }

                setSelectedParents(selectedParent)
            }
        }
    }
}

export const changeLinkOfMenuMethod = (e,openForm, setLink) => {
    let id = openForm.id;
    let currentLink = e.currentTarget.value;
    if (id !== "") {//edit
        let customizedLink = currentLink.replace("internal:", "")
        setLink(customizedLink)
    } else {
        setLink(currentLink)
    }
}
