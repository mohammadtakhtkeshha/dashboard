import React, { useContext, useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

import { Typography } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { StyledLabel, StyledTypographyError } from 'assets/js/library/base/typography';
import { StyledInput } from 'assets/js/library/components/input';
import StyledCheckboxComponent from 'infrastructure/authorized/partials/StyledCheckboxComponent';
import { StyledRadioButton, StyledAddButton } from 'assets/js/library/components/buttons';
import {
  StyledFlexColumn,
  StyledFlexItemInside,
  StyledFormControl,
  StyledHeightInput,
  StyledRoleMargin,
  StyledRolesBlock,
} from 'assets/js/user/newUser';
import { handleChangeMethod, getUsers } from './EditProfileFormComponent.js';
import { StyledEditProfileBody } from 'assets/js/library/pages/user/profile';
import { handleStatusChangeMethod, handleCheckRolesMethod } from 'features/user/partials/modal/partials/NewUserComponent.js';
import { getRolesMethod } from 'features/user/index.js';
import AppContext from 'contexts/AppContext';
import { editUserMethod } from 'features/user/partials/modal/partials/NewUserComponent';
import { getNewTokenMethod } from './header/pictureModal/partials/EditPictureContent.js';

function EditProfileFormComponent({ t, user, setUser, defaultRoles, setDefaultRoles }) {
  const { setLoading } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [faRoles, setFaRoles] = useState();
  const [enRoles, setEnRoles] = useState([]);
  const lang = i18next.language;
  const [userNameList, setUserNameList] = useState([]);
  const [mailList, setMailList] = useState([]);

  const handleChange = (e, field) => {
    handleChangeMethod(e, user, field, setUser, setErrors, userNameList, mailList);
  };

  const handleCheckRoles = e => {
    handleCheckRolesMethod(e, user, defaultRoles, enRoles, faRoles, setDefaultRoles, setUser);
  };

  const getEditedUser = () => {
    getNewTokenMethod(setLoading);
  };
  const edit = () => {
    editUserMethod(user.uid[0].value, user, setLoading, getEditedUser, errors);
  };

  useEffect(() => {
    getUsers(setLoading, setUserNameList, setMailList);
    getRolesMethod(setLoading, setEnRoles, setFaRoles);
  }, [setLoading, setUserNameList, setMailList]);

  return (
    <StyledEditProfileBody>
      <StyledFlexColumn>
        <StyledFlexItemInside>
          <StyledHeightInput>
            <StyledLabel>{t('users:enter your name')}</StyledLabel>
            <StyledInput
              className="first-name"
              value={user.field_name.length > 0 ? user.field_name[0].value : ''}
              type="text"
              placeholder={t('translation:name')}
              onChange={e => handleChange(e, 'field_name')}
            />
          </StyledHeightInput>
          <StyledHeightInput>
            <StyledLabel>{t('users:enter your family')}</StyledLabel>
            <StyledInput
              className="last-name"
              value={user.field_last_name.length > 0 ? user.field_last_name[0].value : ''}
              type="text"
              placeholder={t('users:family')}
              onChange={e => handleChange(e, 'field_last_name')}
            />
          </StyledHeightInput>
          <StyledHeightInput>
            <StyledLabel>{t('users:enter your username')}</StyledLabel>
            <StyledInput
              className="username"
              value={user.name[0].value}
              type="text"
              placeholder={t('users:username')}
              onChange={e => handleChange(e, 'name')}
            />
            {errors.name ? (
              <div>
                {errors.name.required ? <StyledTypographyError>{errors.name.required}</StyledTypographyError> : ''}
                {errors.name.unique ? <StyledTypographyError>{errors.name.unique}</StyledTypographyError> : ''}
              </div>
            ) : (
              ''
            )}
          </StyledHeightInput>
          <StyledAddButton onClick={edit}>{t('translation:register')}</StyledAddButton>
        </StyledFlexItemInside>
        <StyledFlexItemInside>
          <StyledHeightInput>
            <StyledLabel>{t('users:enter your email')}</StyledLabel>
            <StyledInput
              className="email"
              value={user.mail.length > 0 ? user.mail[0].value : ''}
              type="email"
              placeholder={t('users:email')}
              onChange={e => handleChange(e, 'mail')}
            />
            {errors.mail ? (
              <>
                {errors.mail.valid ? <StyledTypographyError>{errors.mail.valid}</StyledTypographyError> : ''}
                {errors.mail.unique ? <StyledTypographyError>{errors.mail.unique}</StyledTypographyError> : ''}
                {errors.mail.required ? <StyledTypographyError>{errors.mail.required}</StyledTypographyError> : ''}
              </>
            ) : (
              ''
            )}
          </StyledHeightInput>
          <StyledFormControl component="fieldset">
            <label>
              <Typography>{t('translation:status')}</Typography>
            </label>
            <StyledRadioButton>
              <RadioGroup
                className="status"
                aria-label="status"
                name="status"
                value={user.status[0].value}
                onChange={e => handleStatusChangeMethod(e, setUser)}>
                <FormControlLabel value={false} control={<Radio />} label={t('translation:block')} />
                <FormControlLabel value={true} control={<Radio />} label={t('translation:confirm')} />
              </RadioGroup>
            </StyledRadioButton>
          </StyledFormControl>
          {/*-------------------------------------------------- role -----------------------------------------------------*/}
          <StyledRolesBlock className="my-role">
            <label>
              <Typography>{t('users:choose role')}</Typography>
            </label>
            {faRoles
              ? Object.keys(faRoles).map((keyName, index) => (
                  <StyledRoleMargin key={index}>
                    <StyledCheckboxComponent
                      key={index}
                      value={keyName}
                      change={e => handleCheckRoles(e)}
                      label={lang === 'en' ? enRoles[keyName] : faRoles[keyName]}
                      checked={defaultRoles.includes(enRoles[index])}
                    />
                  </StyledRoleMargin>
                ))
              : ''}
          </StyledRolesBlock>
        </StyledFlexItemInside>
      </StyledFlexColumn>
    </StyledEditProfileBody>
  );
}

export default withNamespaces('sidebar')(EditProfileFormComponent);
