import React, {useContext} from 'react';
import {withNamespaces} from "react-i18next";
import {NavLink} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

import {StyledActionBtnForm, StyledMenuItem, menu} from "assets/js/library/pages/webform/webformTable"
import {warning} from "methods/swal";
import {deleteFormMethod} from "./FormEditBtn.js";
import AppContext from "contexts/AppContext";
import {get} from "libraries/local-storage";
import i18next from "i18next";

const StyledMenu = withStyles(menu)((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

function FormEditBtn({t, form, setForms, setOpenWebform, setWebform, forms, setIsEditForm}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {setLoading} = useContext(AppContext);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));
    const lang = i18next.language;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteForm = (e) => {
        setAnchorEl(null)
        const body = {
            "form_id": e
        }
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteFormMethod(setLoading, body, setForms);
        });
    };

    const clickEditButton = (form_id) => {
        setAnchorEl(null)
        setOpenWebform(true);
        const selectedForm = forms.filter(f => f.id === form_id)
        setIsEditForm(true)
        setWebform({
            "form_id": selectedForm[0].id,
            "title": selectedForm[0].title,
            "description": selectedForm[0].description,
            "status": selectedForm[0].status
        })
    }

    return (<>
        <StyledActionBtnForm type="button" onClick={handleClick}>
            <span>{t('webforms:editForm')}</span>
            <span className="icon-arrow-up"></span>
        </StyledActionBtnForm>
        <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <StyledMenuItem permission="true" lang={lang}>
                <NavLink to={`/elements/${form.id}/list`}>{t('translation:observe')}</NavLink>
            </StyledMenuItem>
            <StyledMenuItem permission="true" lang={lang}>
                <NavLink to={`elements/${form.id}/list`}>{t('webforms:addElement')}</NavLink>
            </StyledMenuItem>
            <StyledMenuItem permission="true" lang={lang}>
                <NavLink to={`elements/${form.id}/settings`}>{t('translation:settings')}</NavLink>
            </StyledMenuItem>
            <StyledMenuItem permission="true" lang={lang}>
                <NavLink to={`elements/${form.id}/results`}>{t('translation:results')}</NavLink>
            </StyledMenuItem>
            <StyledMenuItem permission={`${permissions['restful post delete_webform_rest_resource'].access}`}
                            onClick={() => deleteForm(form.id)}
                            lang={lang}>
                {t('translation:delete')}
            </StyledMenuItem>
            <StyledMenuItem permission={`${permissions['restful patch form_edit_rest_resource'].access}`}
                            onClick={() => clickEditButton(form.id)}
                            lang={lang}>
                {t('webforms:editForm')}
            </StyledMenuItem>
        </StyledMenu>
    </>);
}

export default withNamespaces('users, translation')(FormEditBtn);
