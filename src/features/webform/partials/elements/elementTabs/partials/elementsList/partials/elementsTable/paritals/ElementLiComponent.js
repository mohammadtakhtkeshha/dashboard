import React, {useRef, useState} from "react"
import {sortable} from "react-sortable";
import {withNamespaces} from "react-i18next";

import {StyledTableBodyRow, StyledTableCell, StyledTr} from "assets/js/library/components/table";
import {StyledRequiredBlock, StyledTitle} from "assets/js/library/pages/webform/elements"
import i18next from "i18next";
import {StyledActionBtnForm, StyledUl} from "assets/js/library/pages/webform/webformTable";
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";

function ElementLiComponent({t, elements, setElements}) {
    const lang = i18next.language
    const editBtn = useRef(null)
    const [editButtonShow, setEditButtonShow] = useState({show: false, id: ''})

    const clickEditBtn = (e) => {
        const curId = e.currentTarget.id
        setEditButtonShow({show: true, id: curId})
    }

    const changeRequired = () => {

    }

    function Item(props) {
        return (<StyledTr  {...props}>
            <StyledTableCell width="69" align="center" minWidth={58}>
                <StyledTitle lang={lang}>
                    <span>{props.children.title}</span>
                    <span className="icon-move-icon"></span>
                </StyledTitle>
            </StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>
                {props.children.field_id}
            </StyledTableCell>
            <StyledTableCell width="10" align="center" minWidth={58}>
                {props.children.type}
            </StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>
                {/*<button>{props.children.required ? 'true' : 'false'}</button>*/}
                {/*<StyledCheckBox checked={props.children.required} changed={changeRequired} value={props.children.required}/>*/}
                <StyledRequiredBlock>
                    <StyledCheckboxComponent checked={props.children.required} changed={changeRequired} value={props.children.required}/>
                </StyledRequiredBlock>
            </StyledTableCell>
            <StyledTableCell width="11" align="center" minWidth={58}>
                <StyledActionBtnForm ref={editBtn} onClick={clickEditBtn} id={props.children.field_id}>
                    <span>{t('webforms:editForm')}</span>
                    <span className="icon-arrow-up"></span>
                    <StyledUl show={editButtonShow.show === true && editButtonShow.id === props.children.field_id}>
                        <li>{t('translation:observe')}</li>
                        <li>negar</li>
                        <li>negar</li>
                    </StyledUl>
                </StyledActionBtnForm>
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

