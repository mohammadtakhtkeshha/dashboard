import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';

import Pagination from '@material-ui/lab/Pagination';

import { StyledPaginationBox } from 'assets/js/pagination';
import AppContext from 'contexts/AppContext';
import { StyledBox } from 'assets/js/App';
import TicketTableComponent from './TicketsTableComponent.jsx';
import TicketHeaderComponent from './TicketHeaderComponent.jsx';
import TicketFilterComponent from './TicketFilterComponent.jsx';
import TicketModalComponent from './modal/TicketModalComponent.jsx';
import { getTicketsMethod, getDepartmenListMethod, constTicket, getClientIdMethod, handlePaginationMethod } from './Index.js';

function Index({ t }) {
  const { setLoading } = useContext(AppContext);
  const [tickets, setTickets] = useState([]);
  const [chunkTickets, setChunkTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [departemanList, setDepartemanList] = useState([]);
  const [ticket, setTicket] = useState(constTicket);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [chosenDepartment, setChosenDepartment] = useState('');
  const [expandedFilter, setExpandedFilter] = useState(false);

  const handlePagination = (tickets, changeDefault) => {
    handlePaginationMethod(tickets, changeDefault, setChunkTickets, setTotalPage, setTickets);
  };

  const paginate = (e, value) => {
    setPage(value - 1);
  };

  const closeForm = () => {
    setOpenForm(false);
    setErrors({});
    setTicket(prevState => {
      constTicket.clientid = prevState.clientid;
      return { ...constTicket };
    });
    setChosenDepartment('');
    setPreviewUrl([]);
  };

  useEffect(() => {
    getDepartmenListMethod(setLoading, setDepartemanList);
    getTicketsMethod(setLoading, setTickets, handlePagination);
  }, [setLoading]); //Once

  useEffect(() => {
    getClientIdMethod(setTicket);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('sidebar:support')}</title>
      </Helmet>
      <TicketHeaderComponent setOpenForm={setOpenForm} setExpandedFilter={setExpandedFilter} />
      <StyledBox>
        <TicketFilterComponent
          tickets={tickets}
          departemanList={departemanList}
          setChunkTickets={setChunkTickets}
          setTotalPage={setTotalPage}
          setTickets={setTickets}
          expandedFilter={expandedFilter}
          setExpandedFilter={setExpandedFilter}
          handlePagination={handlePagination}
        />
      </StyledBox>
      <TicketTableComponent chunkTickets={chunkTickets} page={page} departemanList={departemanList} />
      <StyledPaginationBox>
        <Pagination count={totalPage} onChange={paginate} />
      </StyledPaginationBox>
      <TicketModalComponent
        openForm={openForm}
        closeForm={closeForm}
        chosenDepartment={chosenDepartment}
        setChosenDepartment={setChosenDepartment}
        ticket={ticket}
        errors={errors}
        setTickets={setTickets}
        handlePagination={handlePagination}
        setErrors={setErrors}
        setTicket={setTicket}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        departemanList={departemanList}
      />
    </>
  );
}

export default withNamespaces('users')(Index);
