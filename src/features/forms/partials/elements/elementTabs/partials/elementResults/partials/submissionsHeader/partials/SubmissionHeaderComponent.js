import {download} from "core/services/webforms.service";

export const clickDownload = (setLoading, form_id) => {
    setLoading(true);
    download(setLoading, form_id).then(res => {
        setLoading(false);
        const fileName=res.data.message;
        window.open(`${process.env.REACT_APP_API_URL}/${fileName}`);
    });
}
