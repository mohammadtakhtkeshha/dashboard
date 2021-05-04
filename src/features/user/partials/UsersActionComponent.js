import {multiAction} from "core/services/user.service";
import {danger, success} from "methods/swal";

const body = (action, selectedCheckBoxes) => {
    let data = [];
    for (let id of selectedCheckBoxes) {
        switch (action) {
            case 'delete':
                data.push({
                    "id": id,
                    "status": "deleted"
                })
                break;
            case 'block':
                data.push({
                    "id": id,
                    "status": "blocked"
                })
                break;
            default:
                data.push({
                    "id": id,
                    "status": "actived"
                })
        }
    }
    return data;

}
export const multiActionMethod = (action, appContext, selectedCheckBoxes, loginedUser, t,handlePagination,users) => {
    if (selectedCheckBoxes.includes(`${loginedUser.id}`)) {
        danger(t('translation:loginDelete'), t('translation:ok'));
        return;
    }
    appContext.setLoading(true);
    const data = body(action, selectedCheckBoxes);
    multiAction(data, appContext.handleError).then((response) => {
        appContext.setLoading(false);
        selectedCheckBoxes.forEach(id => {
            if (action === 'delete') {
                const currentUser = users.filter(user => user.user_id === id);
                const currentIndex = users.indexOf(currentUser[0]);
                users.splice(currentIndex, 1);
            } else {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].user_id === id) {
                        users[i].status = (action === "block" ? 'false' : 'true');
                    }
                }
            }
        });
        handlePagination(users,true);
        success(t('translation:successDone'), t('translation:ok'));
    });
}

export default {multiAction}
