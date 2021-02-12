import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from 'react-i18next'

import {Grid, Box, withStyles} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

import {StyledInput, StyledTypographyError} from "assets/js/App"
import {StyledLabel, styledTextField} from "assets/js/App"
import {styledGrid, styledGridFromReply} from "assets/js/ticket/ticketRegister"
import UploadImgComponent from "components/partials/UploadImgComponent.jsx"
import storage from 'libraries/local-storage'
import EditorComponent from "components/partials/EditorComponent.jsx"
import {getOrderListMethod, handleErrorsMethod} from "./../Index.js";//uploadimg method
import AppContext from "contexts/AppContext"
import {stripHtml} from "methods/commons"
import {
    changeOrderMethod,
    handleChangeMethod,
    uploadImgMethod,
    changeDepartmentMethod,
    changePriorityMethod,
    clickEditorMessageMethod
} from "./BodyFormComponent.js"

const StyledTextField = withStyles(styledTextField)(TextField)
const StyledGrid = withStyles(styledGrid)(Grid)
const StyledGridFromReply = withStyles(styledGridFromReply)(Grid)

function TicketRegisterComponent({t, departemanList, ticket, setTicket, errors, openForm, setErrors, chosen, fromreply}) {
    const appContext = useContext(AppContext)
    const currentUser = JSON.parse(storage.get('user'))
    const [imgsAndUrls, setImgsAndUrls] = useState([])
    const [departeman, setDeparteman] = useState(departemanList[0])
    const [orderList, setOrderList] = useState([])
    const [image, setImage] = useState('')

    const handleChange = (e, field) => {
        handleChangeMethod(e, t, field, setTicket, setErrors)
    }

    const uploadImg = (e) => {
        uploadImgMethod(e, setTicket)
    }

    const changeDepartment = (e) => {
        changeDepartmentMethod(e, setDeparteman, setTicket)
    }

    const clickEditorMessage = (e) => {
        clickEditorMessageMethod(e, t, setErrors, setTicket)
    }

    const changeOrder = (e) => {
        changeOrderMethod(e, setTicket)
    }

    const removeImg = (e) => {
        // removeImgMethod(e);
    }

    const getOrderList = () => {
        getOrderListMethod(appContext, setOrderList)
    }

    const changePriority = (e) => {
        changePriorityMethod(e,setTicket)
    }

    const handleErrors = () => {
        handleErrorsMethod(openForm.id, setErrors, t)
    }

    useEffect(() => {
        // getOrderList();
    }, [])

    useEffect(() => {
        // handleErrors();
    }, [openForm.id])

    console.log(ticket)

    return (
        <Box m={3}>
            <StyledGrid container>
                {/*<StyledGridFromReply fromreply={fromreply} item md={4} xs={12}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('users:enter your username')}</StyledLabel>*/}
                {/*        <StyledInput type="text"*/}
                {/*            // defaultValue={currentUser.accountName}*/}
                {/*                     defaultValue="آقای سلیمانی"*/}
                {/*                     placeholder={t('translation:name')}*/}
                {/*                     readOnly*/}
                {/*        />*/}
                {/*    </Box>*/}
                {/*</StyledGridFromReply>*/}
                {/*<StyledGridFromReply fromreply={fromreply} item md={4} xs={12}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('users:enter your email')}</StyledLabel>*/}
                {/*        <StyledInput type="email"*/}
                {/*            // defaultValue={currentUser.mail}*/}
                {/*                     defaultValue="farhangyaran@gmail.com"*/}
                {/*                     placeholder={t('users:email')}*/}
                {/*                     readOnly*/}
                {/*        />*/}
                {/*    </Box>*/}
                {/*</StyledGridFromReply>*/}
                {/*<StyledGridFromReply item xs={12} md={4} fromreply={fromreply}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('translation:subject')}</StyledLabel>*/}
                {/*        <StyledInput value={ticket.subject ? ticket.subject : ""} type="text"*/}
                {/*                     placeholder={t('translation:subject')}*/}
                {/*                     onChange={e => handleChange(e, "subject")}/>*/}
                {/*    </Box>*/}
                {/*    {errors.subject ? <div>*/}
                {/*        {errors.subject.required ?*/}
                {/*            <StyledTypographyError>{errors.subject.required}</StyledTypographyError> : ''}*/}
                {/*    </div> : ""}*/}
                {/*</StyledGridFromReply>*/}
                {/*<StyledGridFromReply item xs={4} fromreply={fromreply}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('tickets:departeman')}</StyledLabel>*/}
                {/*        <StyledTextField id="outlined-select-role-native"*/}
                {/*                         select*/}
                {/*                         value={chosen}*/}
                {/*                         onChange={changeDepartment}*/}
                {/*                         SelectProps={{*/}
                {/*                             native: true,*/}
                {/*                         }}*/}
                {/*                         variant="outlined">*/}
                {/*            {departemanList.map((item) => (*/}
                {/*                <option key={item.id} value={item.id}>{item.name}</option>*/}
                {/*            ))}*/}
                {/*        </StyledTextField>*/}
                {/*    </Box>*/}
                {/*</StyledGridFromReply>*/}
                {/*<StyledGridFromReply item xs={4} fromreply={fromreply}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('tickets:relatedService')}</StyledLabel>*/}
                {/*        <StyledTextField id="outlined-select-role-native"*/}
                {/*                         select*/}
                {/*                         value={ticket.serviceid}*/}
                {/*                         onChange={changeOrder}*/}
                {/*                         SelectProps={{*/}
                {/*                             native: true,*/}
                {/*                         }}*/}
                {/*                         variant="outlined">*/}
                {/*            <option value={0}>{t('translation:none')}</option>*/}
                {/*            {orderList.map((item) => (*/}
                {/*                <option key={item.relid} value={item.relid}>{item.product}{item.domain}</option>*/}
                {/*            ))}*/}
                {/*        </StyledTextField>*/}
                {/*    </Box>*/}
                {/*</StyledGridFromReply>*/}
                {/*<StyledGridFromReply item xs={4} fromreply={fromreply}>*/}
                {/*    <Box m={1}>*/}
                {/*        <StyledLabel>{t('tickets:priority')}</StyledLabel>*/}
                {/*        <StyledTextField id="outlined-select-role-native"*/}
                {/*                         select*/}
                {/*                         value={ticket.priority}*/}
                {/*                         onChange={changePriority}*/}
                {/*                         SelectProps={{*/}
                {/*                             native: true,*/}
                {/*                         }}*/}
                {/*                         variant="outlined">*/}
                {/*            <option value="Hight">{t('tickets:high')}</option>*/}
                {/*            <option value="Medium">{t('tickets:medium')}</option>*/}
                {/*            <option value="Low">{t('tickets:low')}</option>*/}
                {/*        </StyledTextField>*/}
                {/*    </Box>*/}
                {/*</StyledGridFromReply>*/}
                {/*<Grid item xs={12}>*/}
                {/*    <EditorComponent value={ticket.message}*/}
                {/*                     title={t('translation:message')}*/}
                {/*                     onClick={clickEditorMessage}/>*/}
                {/*    {errors.message ? <div>*/}
                {/*        {errors.message.required ?*/}
                {/*            <StyledTypographyError>{errors.message.required}</StyledTypographyError> : ''}*/}
                {/*    </div> : ""}*/}
                {/*</Grid>*/}
                <Grid item xs={12} mb={7}>
                    <UploadImgComponent type="image"
                                        getFileInParent={(e) => uploadImg(e, 'multiple')}
                                        imgsAndUrls={imgsAndUrls}
                                        title={t('translation:choosePic')}
                                        removeImgInParent={(e) => removeImg(e)}
                                        multiple={true}/>
                </Grid>
            </StyledGrid>
        </Box>
)
}

export default withNamespaces('tickets , translation')(TicketRegisterComponent)
