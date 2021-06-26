import React, {useRef, useState, useEffect, useContext} from "react"
import {sortable} from "react-sortable";
import {withNamespaces} from "react-i18next";
import {useParams} from 'react-router-dom'

import {StyledTableBodyRow, StyledTableCell, StyledTr} from "assets/js/library/components/table";
import {StyledRequiredBlock, StyledTitle} from "assets/js/library/pages/webform/elements"
import i18next from "i18next";
import {StyledActionBtnForm, StyledUl} from "assets/js/library/pages/webform/webformTable";
import StyledCheckboxComponent from "features/partials/StyledCheckboxComponent";
import {
    StyledActionButtons,
    StyledActionsBlock
} from "assets/js/library/components/buttons";
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";
import {warning} from "methods/swal";
import {deleteElementMethod} from './ElementLiComponent.js'
import AppContext from "contexts/AppContext";
import {get} from "../../../../../../../../../../libraries/local-storage";

function ElementLiComponent({t, elements, setElements, setOpenElementForm, setElement, setIsEditForm}) {
    const lang = i18next.language
    const ref = useRef(null)
    const [editButtonShow, setEditButtonShow] = useState({show: false, id: ''});
    const {form_id} = useParams();
    const {setLoading} = useContext(AppContext)
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));

    const clickEditBtn = (e) => {
        const curId = e.currentTarget.id
        setEditButtonShow({show: true, id: curId})
    }

    const changeRequired = () => {

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                alert("You clicked outside of me!");
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

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
                {/*<button>{props.children.required ? 'true' : 'false'}</button>*/}
                {/*<StyledCheckBox checked={props.children.required} changed={changeRequired} value={props.children.required}/>*/}
                <StyledRequiredBlock>
                    <StyledCheckboxComponent checked={props.children.field_required} change={changeRequired}
                                             value={props.children.required}/>
                </StyledRequiredBlock>
            </StyledTableCell>
            <StyledTableCell width="11" align="center" minWidth={58}>
                {/*<StyledActionBtnForm ref={ref} onClick={clickEditBtn} id={props.children.field_id}>*/}
                {/*    <span>{t('webforms:editElement')}</span>*/}
                {/*    <span className="icon-arrow-up"></span>*/}
                {/*    <StyledUl show={editButtonShow.show === true && editButtonShow.id === props.children.field_id}>*/}
                {/*        <li>{t('translation:observe')}</li>*/}
                {/*        <li>negar</li>*/}
                {/*        <li>negar</li>*/}
                {/*    </StyledUl>*/}
                {/*</StyledActionBtnForm>*/}
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
                    sortId={i}>{item}</SortableItem>)
            : <StyledTableBodyRow>
                <StyledTableCell colSpan="6" align="right">
                    {t('translation:notFoundRecord')}
                </StyledTableCell>
            </StyledTableBodyRow>
        }
    </>);
}

export default withNamespaces('webforms, translation')(ElementLiComponent);

