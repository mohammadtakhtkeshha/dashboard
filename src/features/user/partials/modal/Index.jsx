import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';

import { makeStyles } from '@material-ui/styles';
import { Modal, Box, Fade } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import HelpIcon from '@material-ui/icons/Help';

import NewUserComponent from './partials/NewUserComponent.jsx';
import { ReactComponent as Exit } from 'assets/svg/exit.svg';
import TourNewUser from './partials/TourNewUser.jsx';
import { StyledTourButton } from 'assets/js/content/partials/modal/insideModal/modalForm';
import { StyledCancelButton, ModalBody } from 'assets/js/library/components/modal';
import { StyledSvg } from 'assets/js/library/base/all';
import { modalClasses } from 'assets/js/library/components/modal';

const useStyle = makeStyles(modalClasses);

function Index({
  t,
  enRoles,
  faRoles,
  topNode,
  openUserForm,
  userMailList,
  userNameList,
  errors,
  setErrors,
  user,
  setUser,
  closeForm,
  getEditedUser,
  getRegisteredUser,
}) {
  const classes = useStyle({ maxWidth: '700px' });
  const [isTourOpen, setIsTourOpen] = useState(false);

  const clicked = () => {
    setIsTourOpen(true);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openUserForm.show}
      onClose={closeForm}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}>
      <Fade in={openUserForm.show} id="modal">
        <Box>
          <StyledCancelButton onClick={closeForm}>
            <StyledSvg>
              <Exit width={'40px'} height={'40px'} />
            </StyledSvg>
          </StyledCancelButton>
          <ModalBody>
            <NewUserComponent
              user={user}
              setUser={setUser}
              isProfile={false}
              closeForm={closeForm}
              getEditedUser={getEditedUser}
              getRegisteredUser={getRegisteredUser}
              errors={errors}
              enRoles={enRoles}
              faRoles={faRoles}
              setErrors={setErrors}
              userNameList={userNameList}
              userMailList={userMailList}
              id={openUserForm.id}
            />
          </ModalBody>
          <StyledTourButton show="true" onClick={clicked} ref={topNode}>
            <HelpIcon />
          </StyledTourButton>
          <TourNewUser setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen} />
        </Box>
      </Fade>
    </Modal>
  );
}

export default withNamespaces('translation')(Index);
