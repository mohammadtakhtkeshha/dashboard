import React, {useContext, useEffect} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import AppContext from 'contexts/AppContext';
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledTableCell,
} from 'assets/js/library/components/table';
import {getFormsMethod} from "./FormsTableComponent.js";
import FormEditBtn from "./partials/FormEditBtn.jsx";

function FormsTableComponent({t, forms, setForms, setBasicForms, setOpenWebform, setWebform, setIsEditForm}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);

    useEffect(() => {
        getFormsMethod(setLoading, setForms, setBasicForms)
    }, [setLoading, setBasicForms, setForms]);

    return (
        <StyledTable>
            <StyledTableHeadTr>
                <StyledTableCell width={10} minWidth={50} align={lang === 'en' ? 'left' : 'right'}>
                    {t('translation:title')}
                </StyledTableCell>
                <StyledTableCell width={51} minWidth={93} align={lang === 'en' ? 'left' : 'right'}>
                    {t('translation:description')}
                </StyledTableCell>
                <StyledTableCell align="center" width={7} minWidth={50}>
                    {t('translation:status')}
                </StyledTableCell>
                <StyledTableCell align="center" width={7} minWidth={50}>
                    {t('translation:author')}
                </StyledTableCell>
                <StyledTableCell align="center" width={5} minWidth={50}>
                    {t('translation:results')}
                </StyledTableCell>
                <StyledTableCell align="center" width={10} minWidth={50}>
                </StyledTableCell>
            </StyledTableHeadTr>
            {forms.length > 0 ? (forms.map((form, index) => (
                    <React.Fragment key={index}>
                        <StyledTr>
                            <StyledTableCell width={10} align={lang === 'en' ? 'left' : 'right'} flex="14">
                                {form.title}
                            </StyledTableCell>
                            <StyledTableCell width={51} align={lang === 'en' ? 'left' : 'right'} flex="14">
                                {form.description}
                            </StyledTableCell>
                            <StyledTableCell align="center" width={7} minWidth={5}>
                                {form.status}
                            </StyledTableCell>
                            <StyledTableCell width={7} align="center" flex="14">
                                {form.author}
                            </StyledTableCell>
                            <StyledTableCell width={5} align="center" flex="14">
                                {form.submition}
                            </StyledTableCell>
                            <StyledTableCell overflow="visible" width={10} minWidth={60} align="center">
                                <FormEditBtn
                                    setIsEditForm={setIsEditForm}
                                    setWebform={setWebform}
                                    setOpenWebform={setOpenWebform}
                                    forms={forms}
                                    setForms={setForms}
                                    form={form}
                                    index={index}
                                    length={forms.length}
                                />
                            </StyledTableCell>
                        </StyledTr>
                    </React.Fragment>))
            ) : (<StyledTr>
                <StyledTableCell colSpan="6" align="right">
                    {t('translation:notFoundRecord')}
                </StyledTableCell>
            </StyledTr>)}
        </StyledTable>
    );
}

export default withNamespaces('users, translation')(FormsTableComponent);
