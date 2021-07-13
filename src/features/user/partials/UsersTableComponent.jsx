import React, { useContext, useEffect, useRef, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import userImg from 'assets/media/image/user.jpg';
import AppContext from 'contexts/AppContext';
import { warning } from 'methods/swal';
import storage from 'libraries/local-storage';
import {
  StyledTr,
  StyledTableHeadTr,
  StyledTable,
  StyledTableImg,
  StyledCheckboxImgInTable,
  StyledTableCell,
} from 'assets/js/library/components/table';
import { StyledBtn, StyledStatusButton } from 'assets/js/library/components/buttons';
import StyledCheckboxComponent from 'features/partials/StyledCheckboxComponent';
import {
  StyledDetailBlock,
  StyledMoreIconBlock,
  DetailTable,
  DetailTableRow,
  DetailTableCell,
  StyledTableCellDetail,
} from 'assets/js/user/partials/userTable';
import { StyledActionButtons, StyledActionsBlock } from 'assets/js/library/components/buttons';
import deleteIcon from 'assets/svg/delete.png';
import editIcon from 'assets/svg/edit.png';
import {allCheckboxHandlerMethod,isCheckedHandlerMethod,delUserMethod} from './UsersTableComponent.js'

function UsersTableComponent({
  t,
  page,
  roles,
  openUserForm,
  setOpenUserForm,
  faRoles,
  chunkUsers,
  setSelectedCheckBoxes,
  passChunckUserList,
  passTotalPage,
  perPage,
  chunckUserHandler,
  selectedCheckBoxes,
  users,
  handlePagination,
}) {
  let id = '';
  const lang = i18next.language;
  const anchorRef = useRef(null);
  let openDetail = false;
  const prevOpenDetail = useRef(openDetail);
  const node = useRef(id);
  const { setLoading } = useContext(AppContext);
  const loginedUser = JSON.parse(storage.get('user'));
  const [showUserDetail, setShowUserDetail] = useState('');

  const handleUserDetail = e => {
    const id = e.currentTarget.value;
    setShowUserDetail(id);
  };

  const clickOutSide = e => {
    if (node.current !== '' && node.current !== null && node.current.contains(e.target)) {
      setShowUserDetail(true);
      return;
    }
    setShowUserDetail(false);
  };

  const handleEditFormOpen = e => {
    const id = e.currentTarget.value;
    setOpenUserForm({ show: true, id: id });
  };

  const allCheckboxHandler = e => {
    allCheckboxHandlerMethod(e,chunkUsers,page,setSelectedCheckBoxes)
  };

  const isCheckedHandler = (e, user) => {
    isCheckedHandlerMethod(e, user,selectedCheckBoxes,setSelectedCheckBoxes)
  };

  const delUser = id => {
    delUserMethod(id,setLoading,loginedUser,users,handlePagination)
  };

  const confirmDeleteHandler = e => {
    let id = e.currentTarget.value;
    warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
      delUser(id);
    });
  };

  useEffect(() => {
    if (prevOpenDetail.current === true && openDetail === false) {
      anchorRef.current.focus();
    }
    prevOpenDetail.current = openDetail;
  }, [openDetail]);

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide); // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [node]);

  return (
    <StyledTable>
      <StyledTableHeadTr>
        <StyledTableCell width={10} minWidth={100}>
          <StyledCheckboxImgInTable minWidth="90">
            <StyledCheckboxComponent
              checked={selectedCheckBoxes.length === (chunkUsers[page] !== undefined ? chunkUsers[page].length : 'zero')}
              change={e => allCheckboxHandler(e)}
            />
            <div>{t('translation:image')}</div>
          </StyledCheckboxImgInTable>
        </StyledTableCell>
        <StyledTableCell width={70} minWidth={93}>
          {t('users:username')}
        </StyledTableCell>
        <StyledTableCell width={10} minWidth={93} align="center">
          {t('translation:status')}
        </StyledTableCell>
        <StyledTableCell width={5} minWidth={50}>
          {t('translation:more')}
        </StyledTableCell>
        <StyledTableCell width={5} minWidth={60}>
          {/*{t('translation:actions')}*/}
        </StyledTableCell>
      </StyledTableHeadTr>
      {chunkUsers[page] !== undefined && chunkUsers[page].length > 0 ? (
        chunkUsers[page].map((user, index) => (
          <React.Fragment key={index}>
            <StyledTr>
              <StyledTableCell width={10} minWidth={100} align="center">
                <StyledCheckboxImgInTable minWidth="90">
                  <StyledCheckboxComponent change={e => isCheckedHandler(e, user)} checked={selectedCheckBoxes.includes(user.user_id)} />
                  <StyledTableImg>{user.picture ? <img src={user.picture} alt="user.name" /> : <img src={userImg} alt={user.name} />}</StyledTableImg>
                </StyledCheckboxImgInTable>
              </StyledTableCell>
              <StyledTableCell width={70} align={lang === 'en' ? 'left' : 'right'} flex="14">
                {user.user_name}
              </StyledTableCell>
              <StyledTableCell width={10} minWidth={93} align="center">
                <StyledStatusButton status={user.status}>
                  {user.status === 'false' ? t('translation:notConfirmed') : t('translation:confirmed')}
                </StyledStatusButton>
              </StyledTableCell>
              <StyledTableCellDetail width={5} minWidth={50} align="center">
                <StyledMoreIconBlock>
                  <StyledBtn ref={node} onClick={e => handleUserDetail(e)} value={user.user_id}>
                    <MoreVertIcon />
                    {showUserDetail === user.user_id ? (
                      <StyledDetailBlock key={index}>
                        <DetailTable>
                          <DetailTableRow>
                            <DetailTableCell align="right">{t('translation:name')}</DetailTableCell>
                            <DetailTableCell align="right">{user.firs_name}</DetailTableCell>
                          </DetailTableRow>
                          <DetailTableRow>
                            <DetailTableCell align="right">{t('users:family')}</DetailTableCell>
                            <DetailTableCell align="right">{user.last_name}</DetailTableCell>
                          </DetailTableRow>
                          <DetailTableRow>
                            <DetailTableCell align="right">{t('users:mail')}</DetailTableCell>
                            <DetailTableCell align="right">{user.mail}</DetailTableCell>
                          </DetailTableRow>
                          <DetailTableRow>
                            <DetailTableCell align="right">{t('users:role')}</DetailTableCell>
                            <DetailTableCell align="right">{user.roles === '' ? t('translation:noRole') : user.roles}</DetailTableCell>
                          </DetailTableRow>
                        </DetailTable>
                      </StyledDetailBlock>
                    ) : (
                      <></>
                    )}
                  </StyledBtn>
                </StyledMoreIconBlock>
              </StyledTableCellDetail>
              <StyledTableCell width={5} minWidth={60} align="center">
                <StyledActionsBlock>
                  <StyledActionButtons
                      permission="true"
                      value={user.user_id}
                      onClick={confirmDeleteHandler}>
                    <img src={deleteIcon} alt={user.user_id} />
                  </StyledActionButtons>
                  <StyledActionButtons
                      permission="true"
                      value={user.user_id}
                      onClick={handleEditFormOpen}>
                    <img src={editIcon} alt={user.user_id} />
                  </StyledActionButtons>
                </StyledActionsBlock>
              </StyledTableCell>
            </StyledTr>
          </React.Fragment>
        ))
      ) : (
        <StyledTr>
          <StyledTableCell colSpan="6" align="right">
            {t('translation:notFoundRecord')}
          </StyledTableCell>
        </StyledTr>
      )}
    </StyledTable>
  );
}

export default withNamespaces('users, translation')(UsersTableComponent);
