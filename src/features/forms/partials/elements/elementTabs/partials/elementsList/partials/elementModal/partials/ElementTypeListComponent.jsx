import React from "react"
import {withNamespaces} from "react-i18next";
import {List, withStyles} from "@material-ui/core";
import i18next from "i18next";

import {listModalStyles, StyledModalHeader} from "assets/js/library/pages/modalList"
import StyledCheckboxComponent from "features/partials/StyledCheckboxComponent";
import {StyledElementTypeLi, StyledElementTypeItem} from "assets/js/library/pages/webform/newWebform";
import {StyledButton} from "assets/js/library/components/buttons";
import {green} from "assets/js/library/abstracts/colors";

const StyledModalList = withStyles(listModalStyles)(List);

function NewElementComponent({t, setElement}) {
    const lang = i18next.language;
    const fields = [
        {
            type: 'textfield',
            preview: <input type='text'/>
        },
        {
            type: 'textarea',
            preview: <textarea/>
        },

        {
            type: 'email',
            preview: <input type='mail'/>
        },
        {
            type: 'radios',
            preview: <StyledCheckboxComponent label="checkbox"/>
        },
        {
            type: 'checkboxes',
            preview: <StyledCheckboxComponent label="checkbox"/>
        },
        {
            type: 'date',
            preview: <input type="date"/>
        },
        {
            type: 'select',
            preview: <select>
                <option>گزینه اول</option>
                <option>گزینه دوم</option>
                <option>گزینه سوم</option>
            </select>
        },
        {
            type: 'number',
            preview: <input type='number'/>
        },
        {
            type: 'tel',
            preview: <input type='tel'/>
        },
    ];

    const chooseElementType = (e) => {
        const currentValue = e.currentTarget.value
        setElement(prevState => {
            switch (currentValue) {
                case 'textfield':
                    return {...prevState, field_type: 'textfield'}
                case 'textarea':
                    return {...prevState, field_type: 'textarea'}
                case 'radios':
                    return {...prevState, field_type: 'radios', field_options: ''}
                case 'checkboxes':
                    return {...prevState, field_type: 'checkboxes', field_options: ''}
                case 'date':
                    return {...prevState, field_type: 'date'}
                case 'select':
                    return {...prevState, field_type: 'select', field_options: ''}
                case 'email':
                    return {...prevState, field_type: 'email'}
                case 'tel':
                    return {...prevState, field_type: 'tel'}
                default:
                    return {...prevState, field_type: 'number'}
            }
        })
    };

    return (<>
        <StyledModalHeader role={undefined} dense button>
            {t('webforms:chooseElementType')}
        </StyledModalHeader>
        <StyledModalList>
            <StyledElementTypeLi>
                <StyledElementTypeItem>{t('translation:type')}</StyledElementTypeItem>
                <StyledElementTypeItem>{t('translation:preview')}</StyledElementTypeItem>
                <StyledElementTypeItem></StyledElementTypeItem>
            </StyledElementTypeLi>
            {fields.map((field, index) => {
                return (<StyledElementTypeLi lang={lang} key={index} role={undefined} dense button>
                    <StyledElementTypeItem flex={1}>{field.type}</StyledElementTypeItem>
                    <StyledElementTypeItem flex={1}>{field.preview}</StyledElementTypeItem>
                    <StyledElementTypeItem flex={1}>
                        <StyledButton value={field.type} id={field.element} onClick={chooseElementType}
                                      bg={green[0]}>{t('webforms:addElement')}</StyledButton>
                    </StyledElementTypeItem>
                </StyledElementTypeLi>);
            })}
        </StyledModalList>
    </>)
}

export default withNamespaces('translation')(NewElementComponent)

