import React, {useContext, useEffect} from "react"
import {addForm,addElement} from "core/services/webforms.service";
import AppContext from "contexts/AppContext";

export default function Component() {
    const {setLoading} = useContext(AppContext)



    useEffect(() => {
        addForm(setLoading,{
            "machin_name": "dashfo1rm11",
            "description": "توضیح فرم",
            "title": "110فرم برای تست داشبورد"
        });
        addElement(setLoading,{
            "form_id": "dashform11",
            "field_options": "مورد دوم ,مورد سوم, مورد چهارم",
            "field_required": false,
            "field_title": "رادیو",
            "field_type": "radios",
            "field_id": "radi1os11"
        })
    }, [setLoading]);

    return (<>
        webForm
    </>)
}
