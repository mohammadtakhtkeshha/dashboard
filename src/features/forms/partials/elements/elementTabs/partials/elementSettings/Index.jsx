import React, {useState} from "react";
import {useParams} from 'react-router-dom';
import HeaderSettings from './headerSettingsElement/HeaderSettingsComponent.jsx';
import ModalElementSettings from './modal/ElementSettingsModalComponent.jsx';
import ListElementSettings from './list/ElementSettingsTableComponent.jsx';

export default function Index() {
    const [openForm, setOpenForm] = useState({show: true, id: ''});
    const {form_id}=useParams();
    const [email,setEmail]=useState({
        "form_id": form_id,
        "label": "لیبل ایمیل",
        "handler_id": "email_machine_anem",
        "status": true,
        "to_mail": "[webform_submission:values:email:raw]",
        "cc_mail": "_default",
        "bcc_mail":"[webform_submission:values:email:raw]",
        "from_mail": "_default",
        "from_name": "[webform_submission:values:nam:raw]",
        "subject" : "_default",
        "body":"[webform_submission:values:nam_khanwadgy:value]"

    })
    // console.log(email)

    const handleClose = () => {
        setOpenForm({show: false, id: ''})
    }

    return (<>
        {/*<HeaderSettings setOpenForm={setOpenForm} openForm={openForm}/>*/}
        {/*<ListElementSettings/>*/}
        {/*<ModalElementSettings*/}
        {/*    hanldeClose={handleClose}*/}
        {/*    openForm={openForm}*/}
        {/*    setEmail={setEmail}*/}
        {/*    setOpenForm={setOpenForm}/>*/}
    </>)
}
