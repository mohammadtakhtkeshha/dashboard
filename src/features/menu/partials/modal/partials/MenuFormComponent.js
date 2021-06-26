import { addMenu } from 'core/services/menu.service';
import { success } from 'methods/swal';
import i18next from 'i18next';

export const registerMethod = (setLoading, body, openForm, getMenus, closeForm) => {
  setLoading(true);
  addMenu(setLoading, body, openForm.id).then(response => {
    setLoading(false);
    getMenus();
    if (openForm.id === '') {
      //register
      success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
    } else {
      //delete
      success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
    }
    closeForm();
  });
};

export const changeStatusMethod = (e, setState, field) => {
  const isChecked = e.currentTarget.checked
  setState(prevState => {
    return { ...prevState, [field]: [{ value: isChecked }] };
  });
};

export const changeParentMethod = (e, setState) => {
  const parentIds = e.map(menu => {
    return { value: menu.id };
  });
  setState(prevState => {
    return { ...prevState, parent: parentIds };
  });
};

const linkValidation = (value, setErrors) => {
  // let externalRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  let externalRegex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  let internalRegex = /^\/[a-zA-Z0-9]+/g;
  let externalRegexTest = externalRegex.test(value);
  let internalRegexTest = internalRegex.test(value);
  let regexValidation = externalRegexTest || internalRegexTest;
  if (regexValidation) {
    setErrors(prevState => {
      delete prevState.link;
      return { ...prevState };
    });
  } else {
    setErrors(prevState => {
      prevState.link && delete prevState.link;
      return { ...prevState, link: { valid: i18next.t('menu:menuLinkValidation') } };
    });
  }
  return { internalRegexTest, externalRegexTest };
};

const titleValidation = (value, setErrors) => {
  if (value.length === 0) {
    setErrors(prevState => {
      return { ...prevState, title: { required: i18next.t('translation:requiredValid') } };
    });
  } else {
    setErrors(prevState => {
      delete prevState.title;
      return { ...prevState };
    });
  }
};

export const handleChangeMethod = (e, field, setMenu, setErrors) => {
  let currentValue;
  if (field === 'link') {
    currentValue = e;
  } else {
    currentValue = e.currentTarget.value;
  }
  if (field === 'link') {
    const { internalRegexTest } = linkValidation(currentValue, setErrors);
    if (internalRegexTest) {
      setMenu(prevState => {
        return {
          ...prevState,
          [field]: [{ uri: `internal:${currentValue}` }],
        };
      });
    } else {
      setMenu(prevState => {
        return {
          ...prevState,
          [field]: [{ uri: currentValue }],
        };
      });
    }
  } else if (field === 'title') {
    titleValidation(currentValue, setErrors);
    setMenu(prevState => {
      return {
        ...prevState,
        [field]: [{ value: currentValue }],
      };
    });
  } else {
    setMenu(prevState => {
      return {
        ...prevState,
        [field]: [{ value: currentValue }],
      };
    });
  }
};

export const handleDefaultParentMethod = (menu, setSelectedParents, menus) => {
  let selectedParent = [];
  if (menu.id) {
    if (menu.parent.length > 0) {
      let parentId = menu.parent[0].value.replace('menu_link_content:', '');
      if (parentId !== null) {
        let value = '';
        function recursive(list) {
          for (let item of list) {
            if (item.uuid === parentId) {
              value = item.title;
            } else {
              if (item.children && item.children.length > 0) {
                recursive(item.children);
              }
            }
          }
          return value;
        }
        value = recursive(menus);
        for (let i = 0; i < menu.parent.length; i++) {
          // for (let parent of menu.parent) {
          selectedParent.push({ id: parentId, name: value });
        }

        setSelectedParents(selectedParent);
      }
    }
  }
};

export const changeLinkOfMenuMethod = (e, openForm, setLink) => {
  let id = openForm.id;
  let currentLink = e.currentTarget.value;
  if (id !== '') {
    //edit
    let customizedLink = currentLink.replace('internal:', '');
    setLink(customizedLink);
  } else {
    setLink(currentLink);
  }
};

export const handleErrorsMethod = (setErrors, openForm) => {
  if (openForm.id === '') {
    //register
    setErrors({
      title: { required: i18next.t('translation:requiredValid') },
      link: { required: i18next.t('translation:requiredValid') },
    });
  }
};

export const getParentAndItsIdsMethod = (id, menu, menus, setParentMenus) => {
  let parents = [];
  let list = [...menus];
  for (let menu of list) {
    if (menu.id === id) {
      const index = list.indexOf(menu);
      list.splice(index, 1);
    }
  }
  for (let menu of list) {
    let idMenu = `menu_link_content:${menu.uuid}`;
    let idAndName = { id: idMenu, name: menu.title };
    parents.push(idAndName);
    if (menu.children && menu.children.length > 0) {
      for (let item of menu.children) {
        let idValue = `menu_link_content:${item.uuid}`;
        let idAndName = { id: idValue, name: item.title };
        parents.push(idAndName);
        if (item.children && item.children.length > 0) {
          for (let part of item.children) {
            let partId = `menu_link_content:${item.uuid}`;
            let idAndName = { id: partId, name: part.title };
            parents.push(idAndName);
          }
        }
      }
    }
  }
  setParentMenus(parents);
};
