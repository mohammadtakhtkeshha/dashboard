import {registerState} from "core/services/taxonomy/partials/state.taxonomy.service";
import {success} from "methods/swal";
import {deleteStateFromTree} from "./../../StateTableComponent.js"
import {getStatesMethod} from "../../../Index.js";
import {isObjectEmpty} from "../../../../../../../../methods/commons";

// function recursiveForAdd(list, registeredState, parentId) {
//     const idOfParent = `${parentId}`
//     for (let item of list) {
//         if (item.id === idOfParent) {
//             if (item.children) {
//                 item.children.push(registeredState)
//             }
//         } else {
//             if (item.children && item.children.length > 0) {
//                 recursiveForAdd(item.children, registeredState, idOfParent)
//             }
//         }
//     }
//     return list
// }

// function addToStates(list, parentList, stateToAddList) {
//     let newList = list
//     for (let parent of parentList) {
//         let parentId = parent.target_id
//         if (parentId !== null) {
//             newList = recursiveForAdd(newList, stateToAddList, parentId)
//         } else {
//             list.push(stateToAddList)
//         }
//     }
//     return list
// }
//
// function editStates(list, id, registered, stateToAddList) {
//     for (let state of list) {
//         if (state.id === id) {
//             stateToAddList.children = state.children
//             deleteStateFromTree(id, list)
//             addToStates(list, registered.parent, stateToAddList)
//         } else {
//             if (state.children && state.children.length > 0) {
//                 editStates(state.children, id, registered, stateToAddList)
//             }
//         }
//     }
//     return list
// }

export const registerMethod = (appContext, body, openForm, setOpenForm, setStates, t, setIds, handlePagination, closeForm,errors) => {
    if(isObjectEmpty(errors)){
        appContext.setLoading(true)
        registerState(appContext.handleError, body, openForm).then(response => {
            appContext.setLoading(false)
            getStatesMethod(appContext.handleError, setStates, handlePagination, setIds)
            if (openForm.id === "") {//register
                success(t('translation:successRegistered'), t('translation:ok'))
            } else {//delete
                success(t('translation:successEdited'), t('translation:ok'))
            }
            setOpenForm({show: false, id: ''})
            closeForm()
        })
    }
}

export const changePublishStatusMethod = (isChecked, setState) => {
    setState(prevState => {
        return {...prevState, status: [{value: isChecked}]}
    });
}

export const handleErrorsMethod = (state, setErrors, t) => {
    const name =state.name[0].value
    if (name.length === 0) {
        setErrors(prevState => {
            return {...prevState, name: {required: t('translation:requiredValid')}}
        });
    }

}

export const changeParentMethod = (e, setState) => {
    const ids = e.map(state => {
        return {target_id: state.id, target_type: 'taxonomy_term'}
    })
    setState(prevState => {
        return {...prevState, parent: ids}
    });
}

export const getParentAndItsIdsMethod = (id, state, states, setParentStates) => {
    let parents = []
    let list = [...states.children]
    for (let state of list) {
        if (state.id === id) {
            const index = list.indexOf(state)
            list.splice(index, 1)
        }
    }
    for (let state of list) {
        let idAndName = {id: state.id, name: state.title}
        parents.push(idAndName)
        if (state.children.length > 0) {
            for (let item of state.children) {
                let idAndName = {id: item.id, name: item.title}
                parents.push(idAndName)
                if (item.children && item.children.length > 0) {
                    for (let part of item.children) {
                        let idAndName = {id: part.id, name: part.title}
                        parents.push(idAndName)
                    }
                }
            }
        }
    }
    setParentStates(parents)
}

export const handleChangeMethod = (e, field, setState, setErrors, t) => {
    const currentValue = e.currentTarget.value
    if (field === "name") {
        if (currentValue.length === 0) {
            setErrors(prevState => {
                return {...prevState, name: {required: t('translation:requiredValid')}}
            });
        } else {
            setErrors(prevState => {
                delete prevState.name
                return {...prevState}
            });
        }
    }
    setState(prevState => {
        return {
            ...prevState, [field]: [{value: currentValue}]
        }
    })
}

export const handleChangePathMethod = (e, setState, setErrors, t) => {
    const currentValue = e.currentTarget.value
    let patt = new RegExp("^\/[a-zA-Z0-9-]+$");
    if(currentValue.length !== 0){
        if (!patt.test(currentValue)) {
            setErrors(prevState => {
                return {...prevState, path: {regex: t('translation:validPath')}}
            });
        } else {
            setErrors(prevState => {
                delete prevState.path
                return {...prevState}
            });
        }
    }else{
        setErrors(prevState => {
            delete prevState.path
            return {...prevState}
        });
    }

    setState(prevState => {
        return {
            ...prevState, path: [{alias: currentValue}]
        }
    })


}

export const clickEditorMethod = (text, setState) => {
    setState(prevState => {
        return {
            ...prevState, description: [{value: text}]
        }
    })
}

export const handleDefaultParentMethod = (state, setSelectedParents, states) => {
    let selectedParent = []
    if (state.tid) {
        const id = state.parent[0].target_id
        if (id !== null) {
            let title = ""

            function recursive(list) {
                for (let item of list) {
                    if (parseInt(item.id) === id) {
                        title = item.title
                    } else {
                        if (item.children && item.children.length > 0) {
                            recursive(item.children)
                        }
                    }
                }
                return title
            }

            title = recursive(states.children)
            for (let parent of state.parent) {
                selectedParent.push({id: id, name: title})
            }
            setSelectedParents(selectedParent)
        }
    }
}
