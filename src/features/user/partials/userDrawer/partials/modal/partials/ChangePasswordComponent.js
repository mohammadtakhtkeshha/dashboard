export const setUserName = (setData) => {
    setData(prevState => {
        // return {...prevState,username: currentUser.accountName}
        return {...prevState, username: 'origin'}
    })
}

export const changePassMethod = (e,t,field,confirmPass,setErrors,setData) => {
    const currentValue = e.currentTarget.value
    if (field === "newPassword") {
        if (currentValue !== confirmPass) {
            setErrors(prevState => {
                return {...prevState, harmony: t('users:harmonyPass')}
            })
        } else {
            setErrors(prevState => {
                delete prevState.harmony
                return {...prevState}
            })
        }
    }
    setData(prevState => {
        return {...prevState, [field]: currentValue}
    })
}

export const changeConfirmPassMethod = (e,t,data,setErrors,setConfirmPass) => {
    const currentValue = e.currentTarget.value
    if (currentValue !== data.newPassword) {
        setErrors(prevState => {
            return {...prevState, harmony: t('users:harmonyPass')}
        })
    } else {
        setErrors(prevState => {
            delete prevState.harmony
            return {...prevState}
        })
    }
    setConfirmPass(currentValue)
}
