import React, {useContext, useEffect, useRef, useState} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {Box, Typography} from "@material-ui/core";

import AppContext from 'contexts/AppContext';
import {warning} from 'methods/swal';
import storage from 'libraries/local-storage';
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledTableCell,
} from 'assets/js/library/components/table';
import {StyledStatusButton} from 'assets/js/library/components/buttons';
import {StyledActionButtons, StyledActionsBlock} from 'assets/js/library/components/buttons';
import deleteIcon from 'assets/svg/delete.png';
import editIcon from 'assets/svg/edit.png';
import {handleChange, delEmailMethod} from './ElementSettingsTableComponent.js';


function ElementSetttingsTableComponent({t, setOpenForm}) {
    let id = '';
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const loginedUser = JSON.parse(storage.get('user'));
    const [showUserDetail, setShowUserDetail] = useState('');
    const [emails, setEmails] = useState([
        {
            "id": "email",
            "label": "label22",
            "notes": "",
            "handler_id": "handler_id22",
            "status": true,
            "conditions": [],
            "weight": null,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "site@site.com",
                "to_options": [],
                "cc_mail": "cc_mail@site.com",
                "cc_options": [],
                "bcc_mail": "bcc_mail@site.com",
                "bcc_options": [],
                "from_mail": "from_mail@site.com",
                "from_options": [],
                "from_name": "from_name",
                "subject": "عنوان",
                "body": "توضیح",
                "excluded_elements": [],
                "html": true,
                "attachments": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "twig": false,
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "Email",
            "notes": "",
            "handler_id": "email",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "Email",
            "notes": "",
            "handler_id": "email_1_mashi",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "test",
            "notes": "",
            "handler_id": "test",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "Email",
            "notes": "",
            "handler_id": "email_189",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "ایمیل جدید",
            "notes": "",
            "handler_id": "email_1",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "لیبل",
            "notes": "",
            "handler_id": "mashins",
            "status": true,
            "conditions": [],
            "weight": null,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "[webform_submission:values:nam:raw]",
                "to_options": [],
                "cc_mail": "[webform_submission:values:nam_khanwadgy:raw]",
                "cc_options": [],
                "bcc_mail": "[webform_submission:values:nam:raw]",
                "bcc_options": [],
                "from_mail": "from_mail@site.com",
                "from_options": [],
                "from_name": "from_name",
                "subject": "[webform_submission:values:nam:raw]",
                "body": "[webform_submission:values:nam:value]",
                "excluded_elements": {
                    "nam_khanwadgy": "nam_khanwadgy",
                    "nam": "nam"
                },
                "html": true,
                "attachments": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "twig": false,
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "Email",
            "notes": "",
            "handler_id": "email_2",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "Email",
            "notes": "",
            "handler_id": "negar",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "_default",
                "to_options": [],
                "cc_mail": "",
                "cc_options": [],
                "bcc_mail": "",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "_default",
                "subject": "_default",
                "body": "_default",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "لیبل ایمیل",
            "notes": "",
            "handler_id": "email_machine_anem",
            "status": true,
            "conditions": [],
            "weight": 0,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "[webform_submission:values:email:raw]",
                "to_options": [],
                "cc_mail": "_default",
                "cc_options": [],
                "bcc_mail": "[webform_submission:values:email:raw]",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "[webform_submission:values:nam:raw]",
                "subject": "_default",
                "body": "[webform_submission:values:nam_khanwadgy:value]",
                "excluded_elements": [],
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "html": true,
                "attachments": false,
                "twig": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "لیبل ایssssssمیل",
            "notes": "",
            "handler_id": "email_ssssmachine_anem",
            "status": true,
            "conditions": [],
            "weight": null,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "[webform_submission:values:email:raw]",
                "to_options": [],
                "cc_mail": "_default",
                "cc_options": [],
                "bcc_mail": "[webform_submission:values:email:raw]",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "[webform_submission:values:nam:raw]",
                "subject": "_default",
                "body": "[webform_submission:values:nam_khanwadgy:value]",
                "excluded_elements": [],
                "html": true,
                "attachments": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "twig": false,
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "لیبل ایssssssمیل",
            "notes": "",
            "handler_id": "eemail_machine_anem",
            "status": true,
            "conditions": [],
            "weight": null,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "[webform_submission:values:email:raw]",
                "to_options": [],
                "cc_mail": "_default",
                "cc_options": [],
                "bcc_mail": "[webform_submission:values:email:raw]",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "[webform_submission:values:nam:raw]",
                "subject": "_default",
                "body": "[webform_submission:values:nam_khanwadgy:value]",
                "excluded_elements": [],
                "html": true,
                "attachments": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "twig": false,
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        },
        {
            "id": "email",
            "label": "لیبل ایمیل",
            "notes": "",
            "handler_id": "eeemail_machine_anem",
            "status": true,
            "conditions": [],
            "weight": null,
            "settings": {
                "states": [
                    "completed"
                ],
                "to_mail": "[webform_submission:values:email:raw]",
                "to_options": [],
                "cc_mail": "_default",
                "cc_options": [],
                "bcc_mail": "[webform_submission:values:email:raw]",
                "bcc_options": [],
                "from_mail": "_default",
                "from_options": [],
                "from_name": "[webform_submission:values:nam:raw]",
                "subject": "_default",
                "body": "[webform_submission:values:nam_khanwadgy:value]",
                "excluded_elements": [],
                "html": true,
                "attachments": false,
                "debug": false,
                "reply_to": "",
                "return_path": "",
                "ignore_access": false,
                "exclude_empty": true,
                "exclude_empty_checkbox": false,
                "exclude_attachments": false,
                "twig": false,
                "sender_mail": "",
                "sender_name": "",
                "theme_name": "",
                "parameters": []
            }
        }
    ])

    const handleUserDetail = e => {
        const id = e.currentTarget.value;
        setShowUserDetail(id);
    };

    const handleEditFormOpen = e => {
        const id = e.currentTarget.value;
        setOpenForm({show: true, id: id});
    };

    const confirmDeleteHandler = e => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            delEmailMethod(id);
        });
    };

    return (<StyledTable>
            <StyledTableHeadTr>
                <StyledTableCell width={30} minWidth={10}>
                    {t('translation:title')}
                </StyledTableCell>
                <StyledTableCell width={30} minWidth={10}>
                    {t('translation:ip')}
                </StyledTableCell>
                <StyledTableCell width={20} minWidth={10}>
                    {t('translation:summary')}
                </StyledTableCell>
                <StyledTableCell width={13} minWidth={10} align='center'>
                    {t('translation:status')}
                </StyledTableCell>
                <StyledTableCell width={7} minWidth={10}>
                </StyledTableCell>
            </StyledTableHeadTr>
            {emails.length > 0 ? (
                emails.map((email, index) => (
                    <React.Fragment key={index}>
                        <StyledTr>
                            <StyledTableCell width={30} minWidth={10} flex="14">
                                {email.label}
                            </StyledTableCell>
                            <StyledTableCell width={30} minWidth={10}>
                                {email.handler_id}
                            </StyledTableCell>
                            <StyledTableCell width={20} minWidth={10}>
                                <Box fontWeight="fontWeightBold">
                                    To:<Typography variant='caption'>{`${email.settings.to_mail}`}</Typography>
                                </Box>
                                <Box fontWeight="fontWeightBold">
                                    CC:<Typography variant='caption'>{email.settings.cc_mail}</Typography>
                                </Box>
                                <Box fontWeight="fontWeightBold">
                                    BCC:<Typography variant='caption'>{email.settings.bcc_mail}</Typography>
                                </Box>
                                <Box fontWeight="fontWeightBold">
                                    From:<Typography variant='caption'>{email.settings.from_mail}</Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell width={13} minWidth={20} align='center'>
                                <StyledStatusButton status={email.status}>
                                    {email.status === 'false' ? t('translation:notConfirmed') : t('translation:confirmed')}
                                </StyledStatusButton>
                            </StyledTableCell>
                            <StyledTableCell width={7} minWidth={10}>
                                <StyledActionsBlock>
                                    <StyledActionButtons
                                        permission="true"
                                        value={email.email_id}
                                        onClick={confirmDeleteHandler}>
                                        <img src={deleteIcon} alt={email.email_id}/>
                                    </StyledActionButtons>
                                    <StyledActionButtons
                                        permission="true"
                                        value={email.email_id}
                                        onClick={handleEditFormOpen}>
                                        <img src={editIcon} alt={email.email_id}/>
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

export default withNamespaces('translation')(ElementSetttingsTableComponent);
