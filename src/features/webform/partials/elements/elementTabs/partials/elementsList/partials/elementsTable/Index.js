import {getElementsList} from "core/services/webforms.service";

export const getElementsListMethod = (setLoading, form, setItems) => {
    setLoading(true)
    return getElementsList(setLoading, form).then(res => {
        setLoading(false)
        setItems(res.data)
    })
}
