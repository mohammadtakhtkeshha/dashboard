import React, {useEffect, useContext, useState} from 'react';
import {withNamespaces} from "react-i18next";
import {useParams} from 'react-router-dom';

import {getSubmissionListMethod} from "./SubmissionsTableComponent.js";
import AppContext from "contexts/AppContext";
import {
    StyledTable,
    StyledTableBody, StyledTableBodyRow,
    StyledTableCell,
    StyledTableHeadTr,
    StyledTr
} from "assets/js/library/components/table";
import {StyledActionButtons, StyledActionsBlock} from "assets/js/library/components/buttons";
import deleteIcon from 'assets/svg/delete.png';
import {warning} from "methods/swal";
import {deleteSubmissionMethod} from './SubmissionsTableComponent.js'
import {get} from "libraries/local-storage";

function SubmissionsTableComponent({t}) {
    const {setLoading} = useContext(AppContext);
    const [submissions, setSubmissions] = useState([]);
    const {form_id} = useParams();
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));

    useEffect(() => {
        getSubmissionListMethod(setLoading, setSubmissions, form_id);
    }, [setLoading, setSubmissions]);//once

    const confirmDeleteHandler = e => {
        let stringValue = e.currentTarget.value;
        const arrayValue = stringValue.split('-');
        const body = {
            form_id: arrayValue[0],
            sid: arrayValue[1],
        }
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'),
            function () {
                deleteSubmissionMethod(setLoading, body, setSubmissions);
            });
    };

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell width="100" align="center" minWidth={58}>{t('translation:id')}</StyledTableCell>
            <StyledTableCell width="100" align="center" minWidth={58}>{t('translation:ip')}</StyledTableCell>
            <StyledTableCell width="100" align="center" minWidth={58}>{t('translation:author')}</StyledTableCell>
            <StyledTableCell width="100" align="center" minWidth={58}>{t('translation:date')}</StyledTableCell>
            {submissions.length > 0 && Object.keys(submissions[0].fields).map((index) => {
                return (<StyledTableCell width="100" align="center" minWidth={58}>{index}</StyledTableCell>)
            })}
            <StyledTableCell width="100" align="center" minWidth={58}></StyledTableCell>
        </StyledTableHeadTr>
        <StyledTableBody>
            {(submissions.length > 0 && permissions['restful get webform_sub_lst_rest_resource'].access) ? (
                submissions.map((submission, index) => (
                    <React.Fragment key={index}>
                        <StyledTr>
                            <StyledTableCell width="100" minWidth={58} align="center">
                                {submission.sid}
                            </StyledTableCell>
                            <StyledTableCell width="100" minWidth={58} align="center">
                                {submission.ip}
                            </StyledTableCell>
                            <StyledTableCell width="100" minWidth={58} align="center">
                                {submission.created}
                            </StyledTableCell>
                            <StyledTableCell width="100" minWidth={58} align="center">
                                {submission.author}
                            </StyledTableCell>
                            {Object.entries(submission.fields).map(([key, value]) => {
                                return (<StyledTableCell key={key} width="100" minWidth={58} align="center">
                                    {value}
                                </StyledTableCell>)
                            })}
                            <StyledTableCell width="100" minWidth={58} align="center">
                                <StyledActionsBlock>
                                    <StyledActionButtons
                                        permission='true'
                                        value={`${form_id}-${submission.sid}`}
                                        onClick={confirmDeleteHandler}>
                                        <img src={deleteIcon}/>
                                    </StyledActionButtons>
                                </StyledActionsBlock>
                            </StyledTableCell>
                        </StyledTr>
                    </React.Fragment>
                ))) : (
                <StyledTableBodyRow>
                    <StyledTableCell colSpan="6" align="right">
                        {t('translation:notFoundRecord')}
                    </StyledTableCell>
                </StyledTableBodyRow>)}
        </StyledTableBody>
    </StyledTable>)
}

export default withNamespaces('translation')(SubmissionsTableComponent)
