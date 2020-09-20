import userService from "core/services/user.service";
import {danger, success} from "methods/swal";

const body = (action, userContext) => {
    let data = [];
    for (let id of userContext.selectedCheckBoxes) {
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
export const multiAction = (action, appContext, userContext, loginedUser, t) => {
    if (userContext.selectedCheckBoxes.includes(`${loginedUser.id}`)) {
        danger(t('translation:loginDelete'), t('translation:ok'));
        return;
    }
    appContext.setLoading(true);
    const data = body(action, userContext);
    userService.multiAction(data, appContext.handleError).then((response) => {
        appContext.setLoading(false);
        userContext.selectedCheckBoxes.map((id) => {
            if (action === 'delete') {
                const currentUser = userContext.users.filter(user => user.uid === id);
                const currentIndex = userContext.users.indexOf(currentUser[0]);
                userContext.users.splice(currentIndex, 1);
            } else {
                for (let i = 0; i < userContext.users.length; i++) {
                    if (userContext.users[i].uid === id) {
                        userContext.users[i].status = (action === 'block' ? 'false' : 'true');
                    }
                }
            }

        });
        userContext.handlePagination(userContext.users,true);
        success(t('translation:successDone'), t('translation:ok'));
    });
}

export default {multiAction}