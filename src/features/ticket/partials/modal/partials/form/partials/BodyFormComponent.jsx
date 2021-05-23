import React, {useState, useEffect, useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid, Box, withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {StyledInput, StyledTypographyError} from 'assets/js/App';
import {StyledLabel, styledTextField} from 'assets/js/App';
import { styledGridFromReply,styledGridIfReply} from 'assets/js/ticket/ticketRegister';
import UploadImgComponent from 'infrastructure/authorized/partials/UploadImgPreviewComponent.jsx';
import EditorComponent from 'infrastructure/authorized/partials/EditorComponent.jsx';
import {getOrderListMethod, handleErrorsMethod} from './../Index.js'; //uploadimg method
import AppContext from 'contexts/AppContext';
import {
    changeOrderMethod,
    handleChangeMethod,
    uploadImgMethod,
    changeDepartmentMethod,
    changePriorityMethod,
    clickEditorMessageMethod,
} from './BodyFormComponent.js';

const StyledTextField = withStyles(styledTextField)(TextField);
const StyledGridFromReply = withStyles(styledGridFromReply)(Grid);
const StyledGridIfReply = withStyles(styledGridIfReply)(Grid);

function BodyFormComponent({t,
                               departemanList,
                               setPreviewUrl,
                               previewUrl,
                               ticket,
                               setTicket,
                               errors,
                               openForm,
                               setErrors,
                               chosenDepartment,
                               fromreply,
                               setChosenDepartment,
                           }) {
    const {setLoading} = useContext(AppContext);
    const [orderList, setOrderList] = useState([]);

    const handleChange = (e, field) => {
        handleChangeMethod(e, t, field, setTicket, setErrors);
    };

    const uploadImg = e => {
        uploadImgMethod(e, setTicket);
    };

    const changeDepartment = e => {
        changeDepartmentMethod(e, setTicket, setChosenDepartment);
    };

    const clickEditorMessage = e => {
        clickEditorMessageMethod(e, t, setErrors, setTicket);
    };

    const changeOrder = e => {
        changeOrderMethod(e, setTicket);
    };

    const removeImg = index => {
        let key = `file${index}`;
        setTicket(prevState => {
            delete prevState[key];
            return {...prevState};
        });
    };

    const changePriority = e => {
        changePriorityMethod(e, setTicket);
    };

    useEffect(() => {
        getOrderListMethod(setLoading, setOrderList);
    }, [setLoading]); //once

    useEffect(() => {
        let action = fromreply === 'false' ? 'AddTicketReply' : 'OpenTicket';
        setTicket(prevState => {
            return {...prevState, action: action};
        });
    }, [setTicket, fromreply]); //Once

    useEffect(() => {
        handleErrorsMethod(openForm.id, setErrors);
    }, [openForm.id, setErrors]); //Once

    return (<Grid container>
            <StyledGridFromReply fromreply={fromreply} item md={4} xs={12}>
                <Box m={1} className="userName">
                    <StyledLabel>{t('users:enter your username')}</StyledLabel>
                    <StyledInput
                        type="text"
                        defaultValue="آقای سلیمانی"
                        placeholder={t('translation:name')}
                        readOnly
                    />
                </Box>
            </StyledGridFromReply>
            <StyledGridFromReply fromreply={fromreply} item md={4} xs={12}>
                <Box m={1} className="email">
                    <StyledLabel>{t('users:enter your email')}</StyledLabel>
                    <StyledInput
                        type="email"
                        defaultValue="farhangyaran@gmail.com"
                        placeholder={t('users:email')}
                        readOnly
                    />
                </Box>
            </StyledGridFromReply>
            <StyledGridFromReply item xs={12} md={4} fromreply={fromreply}>
                <Box m={1} className="subject">
                    <StyledLabel>{t('translation:subject')}</StyledLabel>
                    <StyledInput
                        value={ticket.subject ? ticket.subject : ''}
                        type="text"
                        placeholder={t('translation:subject')}
                        onChange={e => handleChange(e, 'subject')}
                    />
                </Box>
                {errors.subject ? <div>{errors.subject.required ?
                    <StyledTypographyError>{errors.subject.required}</StyledTypographyError> : ''}</div> : ''}
            </StyledGridFromReply>
            <StyledGridFromReply item xs={4} fromreply={fromreply}>
                <Box m={1} className="departeman">
                    <StyledLabel>{t('tickets:departeman')}</StyledLabel>
                    <StyledTextField
                        id="outlined-select-role-native"
                        select
                        value={chosenDepartment}
                        onChange={changeDepartment}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined">
                        {departemanList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </StyledTextField>
                </Box>
            </StyledGridFromReply>
            <StyledGridFromReply item xs={4} fromreply={fromreply}>
                <Box m={1} className="relatedService">
                    <StyledLabel>{t('tickets:relatedService')}</StyledLabel>
                    <StyledTextField
                        id="outlined-select-role-native"
                        select
                        value={ticket.serviceid}
                        onChange={changeOrder}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined">
                        <option value={0}>{t('translation:none')}</option>
                        {orderList.map(item => (
                            <option key={item.relid} value={item.relid}>
                                {item.product}
                                {item.domain}
                            </option>
                        ))}
                    </StyledTextField>
                </Box>
            </StyledGridFromReply>
            <StyledGridFromReply item xs={4} fromreply={fromreply}>
                <Box m={1} className="priority">
                    <StyledLabel>{t('tickets:priority')}</StyledLabel>
                    <StyledTextField
                        id="outlined-select-role-native"
                        select
                        value={ticket.priority}
                        onChange={changePriority}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined">
                        <option value="High">{t('tickets:high')}</option>
                        <option value="Medium">{t('tickets:medium')}</option>
                        <option value="Low">{t('tickets:low')}</option>
                    </StyledTextField>
                </Box>
            </StyledGridFromReply>
            <StyledGridIfReply fromreply={fromreply} item xs={12} className="message">
                <EditorComponent value={ticket.message} title={t('translation:message')}
                                 onClick={clickEditorMessage}/>
                {errors.message ? <div>{errors.message.required ?
                    <StyledTypographyError>{errors.message.required}</StyledTypographyError> : ''}</div> : ''}
            </StyledGridIfReply>
            <StyledGridIfReply fromreply={fromreply} item xs={12} mb={7} className="uploadImg">
                <UploadImgComponent
                    type="image"
                    getFileInParent={e => uploadImg(e, 'multiple')}
                    setPreviewUrl={setPreviewUrl}
                    previewUrl={previewUrl}
                    title={t('translation:choosePic')}
                    removeImgInParent={index => removeImg(index)}
                    multiple={true}
                />
            </StyledGridIfReply>
        </Grid>);
}

export default withNamespaces('tickets , translation')(BodyFormComponent);
