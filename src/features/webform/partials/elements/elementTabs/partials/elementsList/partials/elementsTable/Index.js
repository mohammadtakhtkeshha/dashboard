import {getElementsList} from "core/services/webforms.service";

export const getElementsListMethod = (setLoading, form, setElements) => {
    setLoading(true)
    return getElementsList(setLoading, form).then(res => {
        setLoading(false)
        setElements(res.data)
    })
}
