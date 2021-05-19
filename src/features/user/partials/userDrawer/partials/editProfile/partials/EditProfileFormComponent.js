import { nameValidation, mailValidation } from 'features/user/partials/modal/partials/NewUserComponent';
import { getNotPaginateUser, getUser } from 'core/services/user.service';

export const handleChangeMethod = (e, user, field, setUser, setErrors, userNameList, mailList) => {
  const currentValue = e.currentTarget.value;
  setUser(prevState => {
    return {
      ...prevState,
      [field]: [{ value: currentValue }],
    };
  });
  if (field === 'name') {
    nameValidation(currentValue, user.user_name, userNameList, setErrors);
  }
  if (field === 'mail') {
    mailValidation(currentValue, user.mail, mailList, setErrors);
  }
};

export const getUsers = (setLoading, setUserNameList, setMailList) => {
  setLoading(true);
  getNotPaginateUser(setLoading).then(response => {
    setLoading(false);
    const users = response.data;
    let userNameList = [];
    let userMailList = [];
    for (let user of users) {
      userNameList.push(user.user_name);
      userMailList.push(user.mail);
    }
    setUserNameList(userNameList);
    setMailList(userMailList);
  });
};
export const getUserMethod = (setLoading, id, setUser, setDefaultRoles) => {
  setLoading(true);
  getUser(id, setLoading).then(response => {
    setLoading(false);
    const item = response.data;
    let roles = item.roles;
    let enRolesArr = [];
    for (let role of roles) {
      enRolesArr.push(role.target_id);
    }
    setDefaultRoles([...enRolesArr]);
    let currentEditedUser = {
      field_last_name: item.field_last_name.length > 0 ? item.field_last_name : '',
      field_name: item.field_name.length > 0 ? item.field_name : '',
      mail: item.mail,
      name: item.name,
      roles: item.roles,
      status: item.status,
      uid: [{ value: `${item.uid[0].value}` }],
      user_picture: item.user_picture.length > 0 ? item.user_picture : '',
    };
    setUser(currentEditedUser);
  });
};

export const constUser = {
  name: [
    {
      value: '',
    },
  ],
  mail: [
    {
      value: '',
    },
  ],
  status: [
    {
      value: false,
    },
  ],
  roles: [{ target_id: 'rest_user', target_type: 'user_role' }],
  field_last_name: [
    {
      value: '',
    },
  ],
  field_name: [
    {
      value: '',
    },
  ],
  user_picture: [],
  field_fa_role: [
    {
      value: '',
    },
  ],
};
