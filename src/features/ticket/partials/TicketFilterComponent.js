export const doFilterHandlerMethod = (search, tickets, handlePagination,setChunkTickets, setTotalPage,setTickets) => {
    let currentDeptId=search.department
    let filteredTickets = tickets.filter((item) => {
        let deptId = item.deptid.toString()
        let newTicket =deptId.includes(currentDeptId) &&
            item['status'].includes(search.status) &&
            item['subject'].includes(search.subject)
        return newTicket
    })
    handlePagination(filteredTickets,false)
}

export const changeSearchMethod = (e, field, setSearch) => {
    const value = e.currentTarget.value
    setSearch(prevState => {
        return {...prevState, [field]: value}
    })

}
