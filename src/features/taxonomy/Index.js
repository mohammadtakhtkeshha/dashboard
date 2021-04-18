import {getTaxonomies} from "core/services/taxonomy/taxonomy.service"

export const getTaxonomiesMethod = (appContext,setTaxonomies) => {
    appContext.setLoading(true)
    getTaxonomies(appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const taxonomies = response.data
        setTaxonomies(taxonomies)
    })
}

