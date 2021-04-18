import {getFactors} from "core/factor.service";

export const getFactorsMethod = (appContext,setFactors,clientId) => {
    appContext.setLoading(true)
    getFactors(appContext.handleError,clientId).then((response)=>{
        appContext.setLoading(false)
        let factors =  response.data.invoices.invoice.length > 0 ?response.data.invoices.invoice : []
        setFactors(factors)
    })
}
