import {addTicket} from "core/services/ticket.service";
import {getTicketsMethod} from "../../../../../Index.js";
import {success} from "methods/swal";

export const registerMethod = (t,appContext,params,setTickets,handlePagination,closeForm) => {
    appContext.setLoading(true)
    addTicket(appContext.handleError,params).then((response)=>{
        appContext.setLoading(false)
        getTicketsMethod(appContext,setTickets,handlePagination)
        success(t('translation:successDone'), t('translation:ok'));
        closeForm()
    })
}
