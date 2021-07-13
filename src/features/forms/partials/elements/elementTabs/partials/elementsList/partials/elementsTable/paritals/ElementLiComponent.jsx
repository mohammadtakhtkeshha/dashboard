import React, {useContext, useState} from "react"
import {sortable} from "react-sortable";
import {withNamespaces} from "react-i18next";
import {useParams} from 'react-router-dom';
import i18next from "i18next";

import {StyledTableBodyRow, StyledTableCell, StyledTr} from "assets/js/library/components/table";
import {StyledRequiredBlock, StyledTitle} from "assets/js/library/pages/webform/elements"
import StyledCheckboxComponent from "features/partials/StyledCheckboxComponent";
import {StyledActionButtons, StyledActionsBlock, StyledGreenButton} from "assets/js/library/components/buttons";
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";
import {warning} from "methods/swal";
import {deleteElementMethod} from './ElementLiComponent.js'
import AppContext from "contexts/AppContext";
import {get} from "libraries/local-storage";
import {Typography} from "@material-ui/core";
import {StyledHead} from "assets/js/library/base/all";

function ElementLiComponent({t, elements, setElements, setOpenElementForm, setElement, setIsEditForm, setRequired}) {
    const lang = i18next.language
    const {form_id} = useParams();
    const {setLoading} = useContext(AppContext)
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));

    const changeRequired = (e, children) => {
        const currentValue = e.currentTarget.checked;//true and false are reverse
        setElements(prevState => {
            for (let prev of prevState) {
                if (prev.field_id === children.field_id) {
                    setRequired(prevState => {
                        if (prevState.length > 0) {
                            const found = prevState.some(el => el.field_id === children.field_id);
                            if (found) {
                                for (let req of prevState) {
                                    if (req.field_id === children.field_id) {
                                        req.required = currentValue
                                        return [...prevState]
                                    }
                                }
                            } else {
                                return [...prevState, {
                                    "form_id": children.form_id,
                                    "field_id": children.field_id,
                                    "required": currentValue
                                }]
                            }
                        } else {
                            return [...prevState, {
                                "form_id": children.form_id,
                                "field_id": children.field_id,
                                "required": currentValue
                            }]
                        }
                    })
                    prev.field_required = currentValue
                }
            }
            return [...prevState]
        })
    }

    const confirmDeleteHandler = e => {
        let field_id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:yes'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteElementMethod(setLoading, form_id, field_id, setElements);
        });
    };

    const handleEditFormOpen = e => {
        const field_id = e.currentTarget.value;
        setOpenElementForm(true);
        const currentElement = elements.filter(el => el.field_id === field_id)
        setElement(currentElement[0])
        setIsEditForm(true)
    };

    function Item(props) {
        return (<StyledTr  {...props}>
            <StyledTableCell width="69" align="center" minWidth={58}>
                <StyledTitle lang={lang}>
                    <span>{props.children.field_title}</span>
                    <span className="icon-move-icon"></span>
                </StyledTitle>
            </StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>
                {props.children.field_id}
            </StyledTableCell>
            <StyledTableCell width="10" align="center" minWidth={58}>
                {props.children.field_type}
            </StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>
                <StyledRequiredBlock>
                    <StyledCheckboxComponent
                        checked={props.children.field_required}
                        change={(e) => changeRequired(e, props.children)}
                        value={props.children.field_required}/>
                </StyledRequiredBlock>
            </StyledTableCell>
            <StyledTableCell width="11" align="center" minWidth={58}>
                <StyledActionsBlock>
                    <StyledActionButtons
                        permission={`${permissions['restful post webform_delete_field_rest_resource'].access}`}
                        value={props.children.field_id}
                        onClick={confirmDeleteHandler}>
                        <img src={deleteIcon}/>
                    </StyledActionButtons>
                    <StyledActionButtons
                        permission={`${permissions['restful patch webform_edit_rest_resource'].access}`}
                        value={props.children.field_id}
                        onClick={handleEditFormOpen}>
                        <img src={editIcon}/>
                    </StyledActionButtons>
                </StyledActionsBlock>
            </StyledTableCell>
        </StyledTr>);
    }

    let SortableItem = sortable(Item);

    const onSortItems = (elements) => {
        setElements([...elements]);
    }

    return (<>
        {elements.length > 0 ? elements.map((item, i) =>
            <SortableItem
                key={i}
                onSortItems={onSortItems}
                items={elements}
                sortId={i}>{item}</SortableItem>
        ) : (<StyledTableBodyRow>
            <StyledTableCell colSpan="6" align="right">
                {t('translation:notFoundRecord')}
            </StyledTableCell>
        </StyledTableBodyRow>)
        }
    </>);
}

export default withNamespaces('webforms, translation')(ElementLiComponent);
