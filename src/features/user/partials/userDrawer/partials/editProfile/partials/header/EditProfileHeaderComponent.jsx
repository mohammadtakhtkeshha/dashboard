import React ,{useState}from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next";

import {StyledEditProfileHeader, StyledEditSvgBlock} from "assets/js/library/pages/user/profile"
import {StyledProfile, StyledData} from "assets/js/user/UserDrawerContent"
import AvatarComponent from "infrastructure/authorized/partials/AvatarComponent"
import storage from "libraries/local-storage"
import sinusSvg from "assets/svg/sinusSvg.svg"
import EditIcon from "assets/svg/edit.png"
import EditProfileModalPictureComponent from "./pictureModal/Index.jsx";

function EditProfileHeaderComponent({t, user, setUser}) {
    const currentUser = JSON.parse(storage.get('user'))
    const [isOpen,setIsOpen] = useState(false);
    const lang = i18next.language

    return (<StyledEditProfileHeader>
        <StyledProfile lang={lang}>
            <AvatarComponent showBadge={false}
                             width="4.8rem"
                             height="4.8rem"
                             style={{justifyContent: 'center'}}/>
            <StyledEditSvgBlock onClick={()=>setIsOpen(true)}>
                <img src={EditIcon} alt=""/>
            </StyledEditSvgBlock>
            <StyledData>
                <span>
                    {currentUser !== null && currentUser.roles !== undefined ? currentUser.accountName : ''}
                </span>
                <span>
                     {currentUser !== null && currentUser.roles !== undefined ? currentUser.accountName : ''}
                </span>
            </StyledData>
        </StyledProfile>
        <img src={sinusSvg} alt=""/>
        <EditProfileModalPictureComponent user={user}
                                          setUser={setUser}
                                          isOpen={isOpen}
                                          setIsOpen={setIsOpen}/>
    </StyledEditProfileHeader>)
}

export default withNamespaces('sidebar')(EditProfileHeaderComponent)
