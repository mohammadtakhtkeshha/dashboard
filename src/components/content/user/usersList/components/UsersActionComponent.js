import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {primary, red, blue} from "components/partials/Colors";
import {danger, success, warning} from "methods/swal";
import userService from "core/services/user.service";
import AppContext from "contexts/AppContext";
import storage from "libraries/local-storage";
import UserContext from "contexts/UserContext";
import {StyledButton,StyledMultiButtonsBlock} from "assets/js/App";

function UsersActionComponent({t, handleActionChange}) {
    const actions = [
        {value: 'delete', label: t('translation:delete'),color:red[1]},
        {value: 'block', label: t('translation:block'),color:blue[1]},
        {value: 'active', label: t('translation:active'),color: primary}
    ];
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    let loginedUser = JSON.parse(storage.get('user'));

    let doPaginateActionAfterUpdate = (getUsers) => {
        let chunkedUsers = userContext.chunkItem(getUsers);
        userContext.passChunckUserList(chunkedUsers);
    }

    let multiActionMethod = (action) => {debugger
        if (action === "delete") {
            let data = [];
            if (userContext.selectedCheckBoxes.includes(`${loginedUser.uid}`)) {debugger
                danger(t('translation:loginDelete'), t('translation:ok'));
                return;
            }
            appContext.setLoading(true);
            for (let id of userContext.selectedCheckBoxes) {
                data.push({
                    "id": id,
                    "status": "deleted"
                })
            }
            userService.multiAction(data).then((response) => {debugger
                appContext.setLoading(false);
                userContext.selectedCheckBoxes.map((id) => {
                    let currentUser = userContext.users.filter(user => user.uid === id);
                    let currentIndex = userContext.users.indexOf(currentUser[0]);
                    userContext.users.splice(currentIndex, 1);
                });
                doPaginateActionAfterUpdate(userContext.users);
                success(t('translation:successDone'), t('translation:ok'));
            }).catch((error) => {debugger
                appContext.handleError(error);
            });
        } else if (action === "block") {
            let data = [];
            if (userContext.selectedCheckBoxes.includes(`${loginedUser.uid}`)) {
                danger(t('translation:loginChangeStatus'), t('translation:ok'));
                return;
            }
            for (let id of userContext.selectedCheckBoxes) {
                data.push({
                    "id": id,
                    "status": "blocked"
                })
            }
            userService.multiAction(data).then((response) => {
                appContext.setLoading(false);
                for (let i = 0; i < userContext.users.length; i++) {
                    userContext.selectedCheckBoxes.map((id) => {
                        if (userContext.users[i].uid === id) {
                            userContext.users[i].status = "false";
                        }
                    });
                }
                doPaginateActionAfterUpdate([...userContext.users]);
                success(t('translation:successDone'), t('translation:ok'));
            }).catch((error) => {
                appContext.handleError(error);
            });
        } else {
            let data = [];
            for (let id of userContext.selectedCheckBoxes) {
                data.push({
                    "id": id,
                    "status": "actived"
                })
            }
            userService.multiAction(data).then((response) => {
                appContext.setLoading(false);
                for (let i = 0; i < userContext.users.length; i++) {
                    userContext.selectedCheckBoxes.map((id) => {
                        if (userContext.users[i].uid === id) {
                            userContext.users[i].status = "true";
                        }
                    });
                }
                doPaginateActionAfterUpdate([...userContext.users]);
                success(t('translation:successDone'), t('translation:ok'));
            }).catch((error) => {
                appContext.handleError(error);
            });
        }
    };

    let handleMultiAction = (event) => {debugger
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel')
            , t('translation:notDone'),multiActionMethod(event.currentTarget.value));
    };

    return (<>
        {/*<ExpansionPanel>*/}
        {/*    <ExpansionPanelSummary*/}
        {/*        expandIcon={<ExpandMoreIcon/>}*/}
        {/*        aria-controls="panel1a-content"*/}
        {/*    >*/}
        {/*        <Typography>{t('translation:operator')}</Typography>*/}
        {/*    </ExpansionPanelSummary>*/}
        {/*    <ExpansionPanelDetails>*/}
        {/*        <StyledActionBlock>*/}
        {/*            <TextField*/}
        {/*                select*/}
        {/*                value={action}*/}
        {/*                onChange={handleActionChange}*/}
        {/*                SelectProps={{*/}
        {/*                    native: true,*/}
        {/*                }}*/}
        {/*                variant="outlined"*/}
        {/*            >*/}
        {/*                {actions.map((option) => (*/}
        {/*                    <option key={option.value} value={option.value}>*/}
        {/*                        {option.label}*/}
        {/*                    </option>*/}
        {/*                ))}*/}
        {/*            </TextField>*/}
        {/*        <StyledButton onClick={handleMultiAction}>*/}
        {/*            {t('translation:do')}*/}
        {/*        </StyledButton>*/}
        {/*        </StyledActionBlock>*/}
        {/*    </ExpansionPanelDetails>*/}
        {/*</ExpansionPanel>*/}
        <StyledMultiButtonsBlock>
        {actions.map((option) => (
            <StyledButton onClick={handleMultiAction} bg={option.color} key={option.value} value={option.value}>
                {option.label}
            </StyledButton>
        ))}
        </StyledMultiButtonsBlock>

    </>);
}

export default withNamespaces('translation')(UsersActionComponent);
