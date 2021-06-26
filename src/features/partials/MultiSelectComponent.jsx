import React, {useEffect, useState} from "react"
import {withNamespaces} from "react-i18next";

import CancelIcon from '@material-ui/icons/Cancel';

import {
    StyledMultiSelect, StyledInputValue, StyledValueBlock, StyledMultiBlock
} from "assets/js/library/components/multiSelect";

function MultiSelectComponent({t, array, setArray, placeholder, changeMultiSelect}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const currentValue = e.currentTarget.value
        setInputValue(currentValue)
    }

    const keyUp = (e) => {
        let enterKey = 13; //Key Code for Enter Key
        if (e.which === enterKey) {
            let currentValue = e.currentTarget.value
            setArray(prevState => {
                changeMultiSelect([...prevState, currentValue])
                return [...prevState, currentValue]
            })
            setInputValue('')
        }
    }

    const removeKey = (e, index) => {
        array.splice(index, 1)
        setArray([...array]);
        changeMultiSelect([...array]);
    }

    return (<StyledMultiBlock>
        <StyledMultiSelect hasArr={array.length > 0 ? 'true' : 'false'}>
            <input
                value={inputValue}
                onKeyUp={keyUp}
                type="text"
                placeholder={placeholder}
                onChange={e => handleChange(e)}
            />
            <StyledValueBlock>
                {array.map((item, index) => {
                    return (
                        <StyledInputValue key={index}>{item}<span
                            onClick={(e) => removeKey(e, index)}><CancelIcon/></span></StyledInputValue>)
                })}
            </StyledValueBlock>
        </StyledMultiSelect>
        <span>{t('settings:chooseNexWithEnt')}</span>
    </StyledMultiBlock>)
}

export default withNamespaces('settings, translation')(MultiSelectComponent);

