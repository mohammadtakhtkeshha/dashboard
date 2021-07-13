import {danger, success} from "../../../methods/swal";
import {deleteUser} from "../../../core/services/user.service";
import i18next from "i18next";

export const allCheckboxHandlerMethod = (e,chunkUsers,page,setSelectedCheckBoxes) => {
    let isChecked = e.currentTarget.checked;
    let currentUserList = chunkUsers[page];
    let ids = currentUserList !== undefined ? currentUserList.map(user => user.user_id) : [];
    if (!isChecked) {
        setSelectedCheckBoxes([]);
    } else {
        setSelectedCheckBoxes([...ids]);
    }
};

export const isCheckedHandlerMethod = (e, user,selectedCheckBoxes,setSelectedCheckBoxes) => {
    let currentId = user.user_id;
    if (e.currentTarget.checked) {
        setSelectedCheckBoxes([...selectedCheckBoxes, currentId]);
    } else {
        let filteredSelected = selectedCheckBoxes.filter(item => item !== currentId);
        setSelectedCheckBoxes([...filteredSelected]);
    }
};

export  const delUserMethod = (id,setLoading,loginedUser,users,handlePagination) => {
    setLoading(true);
    let loginUserId = loginedUser.id;
    if (id === loginUserId) {
        danger(i18next.t('translation:loginDelete'), i18next.t('translation:ok'));
        return;
    }
    deleteUser(id, setLoading).then(response => {
        setLoading(false);
        let selectedUser = users.filter(user => user.user_id === id);
        let selectedUserIndex = users.indexOf(selectedUser[0]);
        users.splice(selectedUserIndex, 1);
        handlePagination(users, true);
        success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
    });
};
