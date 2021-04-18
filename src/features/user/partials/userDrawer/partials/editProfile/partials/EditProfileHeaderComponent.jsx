import React from "react"
import {withNamespaces} from "react-i18next"

import {Typography} from "@material-ui/core"

import {StyledEditProfileHeader} from "assets/js/library/pages/user/profile"
import {StyledGreenBackground, StyledProfile} from "assets/js/user/UserDrawerContent"
import AvatarComponent from "infrastructure/authorized/partials/AvatarComponent"
import storage from "libraries/local-storage"
import sinusSvg from "assets/svg/Vector_Smart _Object.svg"

function EditProfileHeaderComponent() {
    const currentUser = JSON.parse(storage.get('user'))

    return (<StyledEditProfileHeader>
        <StyledProfile>
            <AvatarComponent showBadge={false}
                             width="4.8rem"
                             height="4.8rem"
                             style={{justifyContent: 'center'}}/>
            <Typography variant="h4">
                {currentUser !== null && currentUser.roles !== undefined ? currentUser.name : ''}
            </Typography>
        </StyledProfile>
        <img src={sinusSvg} alt=""/>
    </StyledEditProfileHeader>)
}

export default withNamespaces('sidebar')(EditProfileHeaderComponent)
