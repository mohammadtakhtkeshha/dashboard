import {getSubmissionsList, deleteSubmission} from "core/services/webforms.service";
import {success} from "../../../../../../../../methods/swal";
import i18next from "i18next";

export const getSubmissionListMethod = (setLoading, setSubmissions, form_id) => {
    setLoading(true)
    getSubmissionsList(setLoading, form_id).then(res => {
        setLoading(false)
        setSubmissions(res.data)
    })
}

export const deleteSubmissionMethod = (setLoading, body, setSubmissions) => {
    // setLoading(true)
    // deleteSubmission(setLoading, body).then(res => {
    //     setLoading(false)
    setSubmissions(prevState => {
        const currentSubmission = prevState.filter(sub => sub.sid === body.sid);
        const index = prevState.indexOf(currentSubmission[0]);
        prevState.splice(index, 1)
        return [...prevState]
    })
    success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
    // })
}


