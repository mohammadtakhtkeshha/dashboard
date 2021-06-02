/*Description:check if password and confirm password match
 *@return :object
 * */
import { chunkItem, handleTotalPage } from 'infrastructure/layout';
import { getRoles, getNotPaginateUser } from 'core/services/user.service';

/*Description:get name and mail from users elementsTable in an array
 *@return :object
 * */
export function getUsersNameAndMail(users) {
  let nameList = [];
  let mailList = [];
  users.forEach(user => {
    nameList.push(user.user_name);
    mailList.push(user.mail);
  });
  return { nameList, mailList };
}

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

export function handlePaginationMethod(setUserMailList, changeDefaultUsers, setTotalPage, setUsers, items, setChunkUsers, setUserNameList) {
  [...items].reverse();
  changeDefaultUsers && setUsers(items);
  const chunks = chunkItem(items);
  setChunkUsers(chunks);
  const totalPage = handleTotalPage(items);
  setTotalPage(totalPage);
  const { nameList, mailList } = getUsersNameAndMail(items);
  changeDefaultUsers && setUserNameList([...nameList]);
  changeDefaultUsers && setUserMailList([...mailList]);
}

export function getUsersMethod(handlePagination, setLoading) {
  setLoading(true);
  getNotPaginateUser(setLoading).then(response => {
    setLoading(false);
    const currentUsers = response.data;
    handlePagination(currentUsers, true);
  });
}

export function getRolesMethod(setLoading, setEnRoles, setFaRoles, setRoles) {
  setLoading(true);
  getRoles(setLoading).then(response => {
    setLoading(false);
    const roles = response.data;
    const faRoles = Object.values(roles);
    const enRoles = Object.keys(roles);
    setEnRoles(enRoles);
    setFaRoles(faRoles);
    setRoles && setRoles(roles);
  });
}

export function getRegisteredUserMethod(user, users, handlePagination, closeForm) {
  user.user_id = `${user.user_id}`;
  users.unshift(user);
  handlePagination(users, true);
  closeForm();
}

export const getEditedUserMethod = (users, user, handlePagination, setOpenUserForm) => {
  const currentUser = users.filter(item => item.user_id === `${user.user_id}`);
  const index = users.indexOf(currentUser[0]);
  users[index] = user;
  handlePagination(users, true);
  setOpenUserForm({ show: false, id: '' });
};
