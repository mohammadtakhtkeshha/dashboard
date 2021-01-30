import {chunkItem, handleTotalPage} from "structure/layout";
import {getTaxonomies} from "core/services/taxonomy/taxonomy.service";
import {getMenus} from "core/services/menu.service";


export const getTaxonomiesMethod = (appContext,setTaxonomies) => {
    appContext.setLoading(true);
    getTaxonomies(appContext.handleError).then((response) => {
        appContext.setLoading(false);
        const taxonomies = response.data;
        debugger
        setTaxonomies(taxonomies)
    });
}

