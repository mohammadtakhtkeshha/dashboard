import React, {useEffect, useState} from "react"
import {withNamespaces} from "react-i18next";

import {StyledMultiSelect, StyledInputValue, StyledValueBlock} from "assets/js/library/pages/settings/settingsTags"
import CancelIcon from '@material-ui/icons/Cancel';

function SettingsMultiSelect({t, stringField, field, setStringField}) {
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
        setStringField(prevState => {
            return {...prevState, [field]: arr.toString()}
        })
    }, [arr,setStringField,field]);//arr

    useEffect(() => {
        if(stringField.length>0){
            setArr(stringField.split(','))
        }
    }, [stringField,setArr]);//stringField

    const removeKey = (e,index) => {
        arr.splice(index,1)
        setArr([...arr])
    }

    return (<StyledMultiSelect hasArr={arr.length > 0 ? 'true' : 'false'}>
        <input
            value={inputValue}
            onKeyUp={keyUp}
            type="text"
            placeholder={t('contents:keywords')}
            onChange={e => handleChange(e)}
        />
        <StyledValueBlock>
            {arr.map((item, index) => {
                return (<StyledInputValue key={index}>{item}<span onClick={(e)=>removeKey(e,index)}><CancelIcon/></span></StyledInputValue>)
            })}
        </StyledValueBlock>
    </StyledMultiSelect>)
}

export default withNamespaces('settings, translation')(SettingsMultiSelect);

