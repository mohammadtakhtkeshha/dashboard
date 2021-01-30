import {getStates, getState} from "core/services/taxonomy/partials/state.taxonomy.service";
import {chunkItem, handleTotalPage} from "structure/layout"
import {getTaxonomyImages} from "../../../../../core/services/taxonomy/taxonomy.service";

let arr = ["root"]

const getIdForExpanding = function f(data) {
    data.map(item => {
        arr.push(item.id)
        if (item.children) {
            f(item.children)
        }
    })
    return arr
}

export const getStatesMethod = (handleError, setStates, handlePagination, setIds) => {
    getTaxonomyImages(handleError).then((response) => {
        const ids = getIdForExpanding(response.data, setIds)
        setIds(ids)
        handlePagination(response.data)
    })
}

export const getTaxonomyStatesList = (appContext, handlePagination) => {
    appContext.setLoading(true);
    getStates(appContext.handleError).then((response) => {
        appContext.setLoading(false);
        const states = response.data;
        handlePagination(states)
    });
}

export const handlePaginationMethod = (currentStates, setStates, setTotalPage, setChunks, t) => {
    setStates({
        id: 'root',
        title: t('taxonomy:states'), children: currentStates
    })
    const chunks = chunkItem(currentStates);
    const total = handleTotalPage(currentStates);
    setTotalPage(total);
    let currentChunks = []
    for (let chunk of chunks) {
        currentChunks.push({
            id: 'root',
            title: t('taxonomy:states'), children: chunk
        })
    }
    setChunks(chunks);
}

export const getStateMethod = (id, appContext, setState) => {
    appContext.setLoading(true)
    getState(id, appContext).then((response) => {
        appContext.setLoading(false)
        const currentState = response.data
        setState(currentState)
    })
}

export const constState = {
    "vid": [
        {
            "target_id": "images_category"
        }
    ],
    "status": [
        {
            "value": true
        }
    ],
    "name": [
        {
            "value": ""
        }
    ],
    "description": [
        {
            "value": ""
        }
    ],
    "weight": [
        {
            "value": 0
        }
    ],
    "parent": [
        {
            "target_id": null,
            "target_type": "taxonomy_term"
        }
    ],
    "path": [
        {
            "alias": ""
        }
    ]
}

export const emptyState = {
    "vid": [
        {
            "target_id": "images_category"
        }
    ],
    "status": [
        {
            "value": true
        }
    ],
    "name": [
        {
            "value": ""
        }
    ],
    "description": [
        {
            "value": ""
        }
    ],
    "weight": [
        {
            "value": 0
        }
    ],
    "parent": [
        {
            "target_id": null,
            "target_type": "taxonomy_term"
        }
    ],
    "path": [
        {
            "alias": ""
        }
    ]
}

