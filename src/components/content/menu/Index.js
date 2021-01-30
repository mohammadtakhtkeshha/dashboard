import {getMenus, editMenu, getMenu, deleteMenu} from "core/services/menu.service"
import {chunkItem, handleTotalPage} from "structure/layout.js";

export const constMenu = {
    "bundle": [
        {
            "value": "menu_link_content"
        }
    ],
    "enabled": [
        {
            "value": true
        }
    ],
    "title": [
        {
            "value": ""
        }
    ],
    "description": [
        {
            "value": ""
        }
    ],
    "menu_name": [
        {
            "value": "main"
        }
    ],
    "link": [
        {
            "uri": "",
        }
    ],
    "external": [
        {
            "value": false
        }
    ],
    "expanded": [
        {
            "value": false
        }
    ],
    "parent": []
}

const changeBelowToChildren = function f(arr) {
    arr.map((item) => {
        if (item.below) {
            item['children'] = item.below
            delete item.below
            if (item.children) {
                f(item.children)
            }
        }
    })
    return arr
}

export const getMenusMethod = (appContext, setMenus, handlePagination, t, setTotalPage, setChunks,type) => {
    appContext.setLoading(true);
    getMenus(type,appContext.handleError).then((response) => {
        appContext.setLoading(false)
        const data = response.data
        const menus = changeBelowToChildren(data)
        // setMenus({entity_id: "root", title: t('taxonomy:menus'), children: menus})//for tree view
        setMenus(menus) // for sortable
        handlePagination(menus, setMenus, setTotalPage, setChunks, t)
    })
}

export const getMenuMethod = (id, appContext, setMenu,setLink) => {
    appContext.setLoading(true);
    getMenu(appContext.handleError,id).then((response) => {
        appContext.setLoading(false)
        const currentMenu=response.data
        const currentLink = response.data.link[0].uri
        let customizedLink = currentLink.replace("internal:", "")
        setLink(customizedLink)
        setMenu(currentMenu)
    })
}

export const deleteMenuMethod = (handlePagination, appContext) => {
    // appContext.setLoading(true);
    deleteMenu(appContext.handleError).then((response) => {
        appContext.setLoading(true);
    })
}

export const editMenusMethod = (handlePagination, appContext) => {
    // appContext.setLoading(true);
    const body = {
        "bundle": [
            {
                "value": "menu_link_content"
            }
        ],
        "enabled": [
            {
                "value": true
            }
        ],
        "title": [
            {
                "value": "تصویرنگار"
            }
        ],
        "description": [
            {value: "negar"}
        ],
        "menu_name": [//
            {
                "value": "main"
            }
        ],
        "link": [//پیوند
            {
                "uri": "",
                "title": "esdfgh",
                "options": []
            }
        ],
        "external": [
            {
                "value": false
            }
        ],
        "weight": [
            {
                "value": -50
            }
        ],
        "expanded": [
            {
                "value": false
            }
        ],
        "parent": [
            {
                "value": "menu_link_content:f00dcd8f-dc4f-4643-9120-2f2381aeea3b"
            }
        ],
        "revision_translation_affected": [
            {
                "value": true
            }
        ]
    }
    editMenu(appContext.handleError, body).then((response) => {
        appContext.setLoading(true);
    })
}

export const handlePaginationMethod = (currentMenus, setMenus, setTotalPage, setChunks, t) => {
    setMenus({
        entity_id: 'root',
        title: t('taxonomy:menus'), children: currentMenus
    })
    const chunks = chunkItem(currentMenus);
    const total = handleTotalPage(currentMenus);
    setTotalPage(total);
    // let currentChunks = []
    // for (let chunk of chunks) {
    //     currentChunks.push({
    //         entity_id: 'root',
    //         title: t('taxonomy:menus'), children: chunk
    //     })
    // }
    // setChunks(currentChunks);
    setChunks(chunks);
}
