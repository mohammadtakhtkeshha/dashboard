import { getMenus, editMenu, getMenu, deleteMenu } from 'core/services/menu.service';

export const constMenu = {
  bundle: [
    {
      value: 'menu_link_content',
    },
  ],
  enabled: [
    {
      value: true,
    },
  ],
  title: [
    {
      value: '',
    },
  ],
  description: [
    {
      value: '',
    },
  ],
  menu_name: [
    {
      value: 'main',
    },
  ],
  link: [
    {
      uri: '',
    },
  ],
  external: [
    {
      value: false,
    },
  ],
  expanded: [
    {
      value: false,
    },
  ],
  parent: [],
};

const changeBelowToChildren = function f(arr) {
  arr.forEach(item => {
    if (item.below) {
      item['children'] = item.below;
      delete item.below;
      if (item.children) {
        f(item.children);
      }
    }
    if (item.expanded) {
      item.expanded = false;
      if (item.children) {
        f(item.children);
      }
    }
  });
  return arr;
};

export const setCurrentDynamicHeigh = (menuesValue,setDynamicHeight) => {
  if (menuesValue !== undefined && menuesValue.length > 0) {
    let count = menuesValue.length;
    setDynamicHeight(`${count * 63}px`);
  }
};

export const getMenusMethod = (setLoading, setMenus, type,setDynamicHeight) => {
  setLoading(true);
  getMenus(type, setLoading).then(response => {
    setLoading(false);
    const data = response.data;
    const menus = changeBelowToChildren(data);
    setCurrentDynamicHeigh(menus,setDynamicHeight)
    setMenus(menus); // for sortable
  });
};

export const getMenuMethod = (id, setLoading, setMenu, setLink) => {
  setLoading(true);
  getMenu(setLoading, id).then(response => {
    setLoading(false);
    const currentMenu = response.data;
    const currentLink = response.data.link[0].uri;
    let customizedLink = currentLink.replace('internal:', '');
    setLink(customizedLink);
    setMenu(currentMenu);
  });
};

export const deleteMenuMethod = (handlePagination, setLoading) => {
  setLoading(true);
  deleteMenu(setLoading).then(response => {
    setLoading(true);
  });
};

export const editMenusMethod = (handlePagination, setLoading) => {
  setLoading(true);
  const body = {
    bundle: [
      {
        value: 'menu_link_content',
      },
    ],
    enabled: [
      {
        value: true,
      },
    ],
    title: [
      {
        value: 'تصویرنگار',
      },
    ],
    description: [{ value: 'negar' }],
    menu_name: [
      //
      {
        value: 'main',
      },
    ],
    link: [
      //پیوند
      {
        uri: '',
        title: 'esdfgh',
        options: [],
      },
    ],
    external: [
      {
        value: false,
      },
    ],
    weight: [
      {
        value: -50,
      },
    ],
    expanded: [
      {
        value: false,
      },
    ],
    parent: [
      {
        value: 'menu_link_content:f00dcd8f-dc4f-4643-9120-2f2381aeea3b',
      },
    ],
    revision_translation_affected: [
      {
        value: true,
      },
    ],
  };
  editMenu(setLoading, body).then(response => {
    setLoading(false);
  });
};
