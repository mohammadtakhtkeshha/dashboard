import React, {useContext, useEffect, useState} from "react"
import {Helmet} from "react-helmet"
import {withNamespaces} from 'react-i18next'

import Pagination from "@material-ui/lab/Pagination"

import {StyledPaginationBox} from "assets/js/pagination"
import AppContext from "contexts/AppContext"
import {handlePaginationMethod} from "./Index.js"
import {StyledPaper, StyledBox} from "assets/js/App"
import TicketTableComponent from "./partials/TicketsTableComponent.jsx"
import TicketHeaderComponent from "./partials/TicketHeaderComponent.jsx"
import TicketFilterComponent from "./partials/TicketFilterComponent.jsx"
import TicketModalComponent from "./partials/modal/TicketModalComponent.jsx"
import {getTicketsMethod, getDepartmenListMethod, constTicket, getClientIdMethod} from "./Index.js";
import storage from "libraries/local-storage";
import axios from 'axios';
function Index({t}) {
    const appContext = useContext(AppContext)
    const [tickets, setTickets] = useState([])
    const [chunkTickets, setChunkTickets] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0);
    const [openForm, setOpenForm] = useState(false)
    const [errors, setErrors] = useState({})
    const [departemanList, setDepartemanList] = useState([])
    const [ticket, setTicket] = useState(constTicket)
    const [chosenDeparteman, setChosenDeparteman] = useState('')
    const [expandedFilter, setExpandedFilter] = useState(false)

    const currentUser = JSON.parse(storage.get('user'))

    const handlePagination = (tickets, changeDefault) => {
        handlePaginationMethod(tickets, changeDefault, setChunkTickets, setTotalPage, setTickets)
    }

    const paginate = (e, value) => {
        setPage(value - 1)
    }

    const closeForm = () => {
        setOpenForm(false)
        setErrors({})
        setTicket(prevState => {
            constTicket.clientid = prevState.clientid
            return {...constTicket}
        })
        setChosenDeparteman("")
    }

    const getClientId = () => {
        getClientIdMethod(setTicket, currentUser, setTicket)
    }

    useEffect(() => {
        // getTicketsMethod(appContext, setTickets, handlePagination)
        // getDepartmenListMethod(appContext, setDepartemanList)
        // getClientId()

        // var formData = new FormData();
        // formData.append('subject', 'subject');
        // formData.append("message", 'message');
        // formData.append("deptid", 6);
        // formData.append("clientid", 215);
        // formData.append("priority", 'Medium');
        // formData.append("markdown", true);
        // formData.append("serviceid", 387);
        //
        // axios.post('http://crm.europetravel.ir/ticketProxy/', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        //     .then(res => console.log(res.data))
        //     .catch(err => console.error(err));




        //  axios({
        //     url:'http://crm.webrbp.ir/ticketProxy.php',
        //     method:'POST',
        //     headers:  {
        //                     'Content-Type': 'multipart/form-data'
        //                 }
        //                 ,
        //     data:formData,
        //     // params:option.params
        // })

    }, [])

    return (
        <>
            <Helmet>
                <title>
                    {t('sidebar:support')}
                </title>
            </Helmet>
            <StyledPaper>
                <TicketHeaderComponent setOpenForm={setOpenForm} setExpandedFilter={setExpandedFilter}/>
                <StyledBox>
                    <TicketFilterComponent tickets={tickets}
                                           departemanList={departemanList}
                                           setChunkTickets={setChunkTickets}
                                           setTotalPage={setTotalPage}
                                           setTickets={setTickets}
                                           expandedFilter={expandedFilter}
                                           setExpandedFilter={setExpandedFilter}
                                           handlePagination={handlePagination}/>
                </StyledBox>
                <TicketTableComponent chunkTickets={chunkTickets} page={page} departemanList={departemanList}/>
                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
                <TicketModalComponent openForm={openForm}
                                      setOpenForm={setOpenForm}
                                      closeForm={closeForm}
                                      chosenDeparteman={chosenDeparteman}
                                      setChosenDeparteman={setChosenDeparteman}
                                      ticket={ticket}
                                      errors={errors}
                                      setTickets={setTickets}
                                      handlePagination={handlePagination}
                                      setErrors={setErrors}
                                      setTicket={setTicket}
                                      departemanList={departemanList}/>
            </StyledPaper>
        </>)
}

export default withNamespaces('users')(Index)
