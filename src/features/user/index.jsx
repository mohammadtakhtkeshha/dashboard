import React, { useEffect, useState, useContext, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';

import Pagination from '@material-ui/lab/Pagination';

import UsersTableComponent from './partials/UsersTableComponent.jsx';
import UsersFilterComponent from './partials/UsersFilterComponent';
import UsersActionComponent from './partials/UsersActionComponent.jsx';
import UsersRegisterModalComponent from './partials/modal/Index.jsx';
import UsersHeaderComponent from './partials/header/UserHeaderComponent.jsx';
import { StyledBox } from 'assets/js/App';
import { StyledPaginationBox } from 'assets/js/pagination';
import AppContext from 'contexts/AppContext';
import { constUser, handlePaginationMethod, getUsersMethod, getRolesMethod, getEditedUserMethod, getRegisteredUserMethod } from './index.js';

function UsersComponent({ t }) {
  const {setLoading} = useContext(AppContext);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
  const [page, setPage] = useState(0);
  const [roles, setRoles] = useState([]);
  const [faRoles, setFaRoles] = useState();
  const [enRoles, setEnRoles] = useState([]);
  const [users, setUsers] = useState([]); //not paginatedUsers
  const [chunkUsers, setChunkUsers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState({ show: false, id: '' });
  const [userNameList, setUserNameList] = useState([]);
  const [userMailList, setUserMailList] = useState([]);
  const [errors, setErrors] = useState({}); //errorName: {},errorPass: {},specialChar: {},errorMail: {},confirmPass: {}
  const [user, setUser] = useState(constUser);
  const [expandedFilter, setExpandedFilter] = useState(false);
  const topNode = useRef(null);

  const handlePagination = (items, changeDefaultUsers) => {
    handlePaginationMethod(setUserMailList, changeDefaultUsers, setTotalPage, setUsers, items, setChunkUsers, setUserNameList);
  };

  const paginate = (e, value) => {
    setPage(value - 1);
    setSelectedCheckBoxes([]);
  };

  const getRegisteredUser = user => {
    getRegisteredUserMethod(user, users, handlePagination, closeForm);
  };

  const getEditedUser = user => {
    getEditedUserMethod(users, user, handlePagination, setOpenUserForm);
  };

  const closeForm = () => {
    setOpenUserForm({ show: false, id: '' });
    setUser(constUser);
    setErrors({});
  };

  useEffect(() => {
    getUsersMethod(handlePagination, setLoading);
    getRolesMethod(setLoading, setEnRoles, setFaRoles, setRoles);
  }, [setLoading, setEnRoles, setFaRoles, setRoles]);

  return (
    <>
      <Helmet>
        <title>{t('sidebar:users')}</title>
      </Helmet>
      <UsersHeaderComponent setOpenUserForm={setOpenUserForm} setExpandedFilter={setExpandedFilter} />
      <StyledBox>
        <UsersFilterComponent
          users={users}
          faRoles={faRoles}
          expandedFilter={expandedFilter}
          setExpandedFilter={setExpandedFilter}
          enRoles={enRoles}
          handlePagination={handlePagination}
        />
      </StyledBox>
      <UsersTableComponent
        page={page}
        totalPage={totalPage}
        users={users}
        getEditedUser={getEditedUser}
        selectedCheckBoxes={selectedCheckBoxes}
        handlePagination={handlePagination}
        getRegisteredUser={getRegisteredUser}
        setOpenUserForm={setOpenUserForm}
        roles={roles}
        faRoles={faRoles}
        chunkUsers={chunkUsers}
        setSelectedCheckBoxes={setSelectedCheckBoxes}
        openUserForm={openUserForm}
      />
      <UsersRegisterModalComponent
        user={user}
        setUser={setUser}
        enRoles={enRoles}
        faRoles={faRoles}
        closeForm={closeForm}
        openUserForm={openUserForm}
        getEditedUser={getEditedUser}
        getRegisteredUser={getRegisteredUser}
        errors={errors}
        setErrors={setErrors}
        userNameList={userNameList}
        userMailList={userMailList}
        topNode={topNode}
      />
      <UsersActionComponent selectedCheckBoxes={selectedCheckBoxes} users={users} handlePagination={handlePagination} />
      <StyledPaginationBox>
        <Pagination count={totalPage} onChange={paginate} />
      </StyledPaginationBox>
    </>
  );
}

export default withNamespaces('users')(UsersComponent);
