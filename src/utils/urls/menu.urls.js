const baseUrl =process.env.REACT_APP_API_URL;

export const getMenusWebUrl = `${baseUrl}/api/menu_items/main?_format=json`
export const getMenusMobileUrl = `${baseUrl}/api/menu_items/mobile-menu?_format=json`

export const getDeleteEditMenuUrl = (id) => {
    return `${baseUrl}/admin/structure/menu/item/${id}/edit?_format=json`
}

export const addMenuUrl = `${baseUrl}/entity/menu_link_content`

