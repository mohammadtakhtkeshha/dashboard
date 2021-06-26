import { registerState } from 'core/services/taxonomy/partials/category.taxonomy.service';
import { success } from 'methods/swal';
import { isObjectEmpty } from 'methods/commons';
import i18next from 'i18next';

export const registerMethod = (setLoading, body, openForm, setStates, closeForm, errors, getStates) => {
  if (isObjectEmpty(errors)) {
    setLoading(true);
    registerState(setLoading, body, openForm).then(response => {
      setLoading(false);
      getStates();
      if (openForm.id === '') {
        //register
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
      } else {
        //delete
        success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
      }
      closeForm();
    });
  }
};

export const changePublishStatusMethod = (isChecked, setState) => {
  setState(prevState => {
    return { ...prevState, status: [{ value: isChecked }] };
  });
};

export const handleErrorsMethod = (category, setErrors) => {
  const name = category.name[0].value;
  if (name.length === 0) {
    setErrors(prevState => {
      return { ...prevState, name: { required: i18next.t('translation:requiredValid') } };
    });
  }
};

export const changeParentMethod = (e, setState) => {
  const ids = e.map(category => {
    return { target_id: category.id, target_type: 'taxonomy_term' };
  });
  setState(prevState => {
    return { ...prevState, parent: ids };
  });
};

export const handleChangeMethod = (e, field, setState, setErrors) => {
  const currentValue = e.currentTarget.value;
  if (field === 'name') {
    if (currentValue.length === 0) {
      setErrors(prevState => {
        return { ...prevState, name: { required: i18next.t('translation:requiredValid') } };
      });
    } else {
      setErrors(prevState => {
        delete prevState.name;
        return { ...prevState };
      });
    }
  }
  setState(prevState => {
    return {
      ...prevState,
      [field]: [{ value: currentValue }],
    };
  });
};

export const handleChangePathMethod = (e, setState, setErrors) => {
  const currentValue = e.currentTarget.value;
  // let patt = new RegExp("^\/[a-zA-Z0-9-]+$");
  let patt = new RegExp('^/[a-zA-Z0-9-]+$');
  if (currentValue.length !== 0) {
    if (!patt.test(currentValue)) {
      setErrors(prevState => {
        return { ...prevState, path: { regex: i18next.t('translation:validPath') } };
      });
    } else {
      setErrors(prevState => {
        delete prevState.path;
        return { ...prevState };
      });
    }
  } else {
    setErrors(prevState => {
      delete prevState.path;
      return { ...prevState };
    });
  }

  setState(prevState => {
    return {
      ...prevState,
      path: [{ alias: currentValue }],
    };
  });
};

export const clickEditorMethod = (text, setCategory) => {
  setCategory(prevState => {
    return {
      ...prevState,
      description: [{ value: text }],
    };
  });
};

export const handleDefaultParentMethod = (category, setSelectedParents, states) => {
  let selectedParent = [];
  if (category.tid) {
    const id = category.parent[0].target_id;
    if (id !== null) {
      let title = '';
      function recursive(list) {
        for (let item of list) {
          if (parseInt(item.id) === id) {
            title = item.title;
          } else {
            if (item.children && item.children.length > 0) {
              recursive(item.children);
            }
          }
        }
        return title;
      }
      title = recursive(states);
      for (let i of category.parent) {
        selectedParent.push({ id: id, name: title });
      }
      setSelectedParents(selectedParent);
    }
  }
};

export const getParentAndItsIdsMethod = (id, states, setParentStates) => {
  let parents = [];
  let list = [...states];
  for (let category of list) {
    if (category.id === id) {
      const index = list.indexOf(category);
      list.splice(index, 1);
    }
  }
  for (let category of list) {
    let idAndName = { id: category.id, name: category.title };
    parents.push(idAndName);
    if (category.children.length > 0) {
      for (let item of category.children) {
        let idAndName = { id: item.id, name: item.title };
        parents.push(idAndName);
        if (item.children && item.children.length > 0) {
          for (let part of item.children) {
            let idAndName = { id: part.id, name: part.title };
            parents.push(idAndName);
          }
        }
      }
    }
  }
  setParentStates(parents);
};