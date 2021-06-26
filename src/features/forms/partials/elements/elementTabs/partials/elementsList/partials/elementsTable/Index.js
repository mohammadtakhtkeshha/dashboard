import {getElementsList} from "core/services/webforms.service";

export const getElementsListMethod = (setLoading, form_id, setElements) => {
    setLoading(true)
    return getElementsList(setLoading, form_id).then(res => {
        setLoading(false)
        setElements(res.data)
    })
}
