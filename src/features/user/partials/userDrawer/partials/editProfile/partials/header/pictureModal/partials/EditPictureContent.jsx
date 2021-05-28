import React, {useState, useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {Box} from '@material-ui/core/index';

import AppContext from 'contexts/AppContext';
import {StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import UploadImgComponent from 'infrastructure/authorized/partials/UploadImgComponent';

import {StyledRegisterButton} from 'assets/js/library/components/buttons';
import {
    uploadImgMethod,
    removedFileIdMethod,
} from 'features/user/partials/modal/partials/NewUserComponent';
import {get} from 'libraries/local-storage';
import EditProfilePicTour from './EditProfilePicTour.jsx';
import {getNewTokenMethod, editUserMethod} from './EditPictureContent.js';

function EditPictureContent({t, user, setUser, setIsOpen, isTourOpen, setIsTourOpen}) {
    const {setLoading} = useContext(AppContext);
    const [imgAndUrl, setImgAndUrl] = useState([]);
    const currentUserId = JSON.parse(get(process.env.REACT_APP_USER)).id;

    const removedFileId = () => {
        removedFileIdMethod(setUser, setImgAndUrl);
    };

    const saveFile = e => {
        uploadImgMethod(e, setUser, setImgAndUrl, setLoading);
    };

    const getEditedUser = (user) => {
        setIsOpen(false);
        getNewTokenMethod(setLoading);
    };

    const register = () => {
        editUserMethod(currentUserId, user, setLoading, getEditedUser, [],setIsOpen);
    };

    return (
        <>
            <StyledModalHeader>{t('users:editPicture')}</StyledModalHeader>
            <StyledModalBody>
                <Box mt={4} className="upload-block">
                    <UploadImgComponent
                        type="image"
                        multiple={false}
                        title={t('translation:choosePic')}
                        getFileInParent={e => saveFile(e, 'single')}
                        imgsAndUrls={imgAndUrl}
                        removeImgInParent={removedFileId}
                    />
                </Box>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledRegisterButton onClick={register}>{t('translation:register')}</StyledRegisterButton>
            </StyledModalFooter>
            <EditProfilePicTour isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen}/>
        </>
    );
}

export default withNamespaces('users, translation')(EditPictureContent);
