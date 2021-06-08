import React, {useContext, useEffect, useState, useRef} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';
import {NavLink} from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledTableCell,
} from 'assets/js/library/components/table';
import {getFormsMethod} from "./WebformsTableComponent.js";
import {StyledActionBtnForm, StyledUl} from "assets/js/library/pages/webform/webformTable"

function WebformsTableComponent({t, forms,setForms,setBasicForms}) {
    const editBtn = useRef(null)
    // const editBtnBlock = useRef(null)
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const [editButtonShow, setEditButtonShow] = useState({show: false, id: ''})

    const clickEditBtn = (e) => {
        const curId = e.currentTarget.id
        setEditButtonShow({show: true, id: curId})
    }

    const clickOutSide = (e) => {
        const curId = e.currentTarget.id
        if (editBtn.current !== '' && editBtn.current !== null && editBtn.current.contains(e.target)) {
            setEditButtonShow({show:true,id:curId});
            return;
        }
        setEditButtonShow({show:'',id:''});
    }

    useEffect(() => {
        getFormsMethod(setLoading, setForms,setBasicForms)
    }, [setLoading,setBasicForms,setForms]);

    useEffect(() => {
        document.addEventListener('mousedown', clickOutSide); // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
    }, [editBtn]);

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
            {forms.length > 0 ? (
                forms.map((form, index) => (
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
                                author
                            </StyledTableCell>
                            <StyledTableCell width={5} align="center" flex="14">
                                {form.submition}
                            </StyledTableCell>
                            <StyledTableCell overflow="visible" width={10} minWidth={60} align="center">
                                <StyledActionBtnForm ref={editBtn} onClick={clickEditBtn} id={form.id}>
                                    <span>{t('webforms:editForm')}</span>
                                    <span className="icon-arrow-up"></span>
                                    <StyledUl show={editButtonShow.show === true && editButtonShow.id === form.id}>
                                        <li>{t('translation:observe')}</li>
                                        <li>
                                            <NavLink to={`elements/${form.title}`}>{t('webforms:addElement')}</NavLink>
                                        </li>
                                        <li>negar</li>
                                    </StyledUl>
                                </StyledActionBtnForm>
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

export default withNamespaces('users, translation')(WebformsTableComponent);
