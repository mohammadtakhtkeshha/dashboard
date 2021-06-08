import React, {useEffect, useState} from "react"
import {withNamespaces} from "react-i18next";

import {
    StyledMultiSelect, StyledInputValue, StyledValueBlock, StyledMultiBlock
} from "assets/js/library/components/multiSelect";
import CancelIcon from '@material-ui/icons/Cancel';

function MultiSelectComponent({t, stringField, field, setStringField, placeholder}) {
    const [arr, setArr] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const currentValue = e.currentTarget.value
        setInputValue(currentValue)
    }

    const keyUp = (e) => {
        let enterKey = 13; //Key Code for Enter Key
        if (e.which === enterKey) {
            let currentValue = e.currentTarget.value
            setArr(prevState => {
                return [...prevState, currentValue]
            })
            setInputValue('')
        }
    }

    useEffect(() => {
        if (stringField !== undefined) {
            setStringField(prevState => {
                return {...prevState, [field]: arr.toString()}
            })
        }
    }, [stringField,arr, setStringField, field]);//arr

    useEffect(() => {
        if (stringField !== undefined) {
            if (stringField.length > 0) {
                setArr(stringField.split(','))
            }
        }
    }, [stringField, setArr]);//stringField

    const removeKey = (e, index) => {
        arr.splice(index, 1)
        setArr([...arr])
    }

    return (<StyledMultiBlock>
        <StyledMultiSelect hasArr={arr.length > 0 ? 'true' : 'false'}>
            <input
                value={inputValue}
                onKeyUp={keyUp}
                type="text"
                placeholder={placeholder}
                onChange={e => handleChange(e)}
            />
            <StyledValueBlock>
                {arr.map((item, index) => {
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

