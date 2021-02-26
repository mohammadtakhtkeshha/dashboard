import React ,{useEffect,useContext,useState}from "react";
import {getPermissionsMethod,addRoleMethod,editRoleMethod,deleteRoleMethod} from "./Index.js"
import {getPermissionList,deleteRole,addRole,editRole} from "core/services/permission.service"
import AppContext from "contexts/AppContext";

export default function Index() {
    const appContext = useContext(AppContext);
    const [permissions,setPermissions]=useState([])

    useEffect(() => {
        // getPermissionsMethod(appContext)
        // addRoleMethod(appContext)
        // editRoleMethod(appContext)
        // deleteRoleMethod(appContext)
    }, []);

    return(<div>
        negar
    </div>)
}
