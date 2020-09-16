/*Description:check if password and confirm password match
*@return :object
* */
export function checkPassWithConfirm(pass,confirmPass) {
    let message = {};
    let valid=false;
    let confirmPassword = confirmPass;
    if (confirmPassword !== pass) {
        message.harmony = 'پسوردهای وارد شده باهم همخوانی ندارند!'
        valid = true;
    }
    return {message,valid};
}

/*Description:check if mail has correct format
*@return :object
* */
export function checkMail(mail,exMail,userMailList) {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let message = {};
    let valid=false;
    if (!regex.test(mail)) {
        let mail = 'ایمیل وارد شده معتبر نمیباشد!';
        message.mail = mail;
        valid = true;
    }
    let currentMailList = [];
    if (exMail !== "null") {
        for (let item of userMailList) {
            currentMailList.push(item);
        }
        let currentIndex = currentMailList.indexOf(exMail);
        currentMailList.splice(currentIndex, 1);
    } else {
        currentMailList = userMailList;
    }
    if (currentMailList.includes(mail)) {
        let mail = 'ایمیل وارد شده تکراری میباشد!';
        message.unique = mail;
        valid = true;

    }
    return {message,valid};
}

/*Description:check if password length is more than 8 charachter and is valid
*@return :object
* */
export function checkPass(password,type) {
    let lengthValid;
    let regexValid;
    let valid;
    let message = {};
    if(type==="edit"){
        if(password.length === 0 ){
            return;
        }
    }
    if (password.length < 8) {
        lengthValid = 'حداقل تعداد کاراکترهای انتخابی 8 میباشد!';
        message.length = lengthValid;
        lengthValid = true;
    }
    let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;؟|,\.?~_+-=\|])/;
    if (!regex.test(password)) {
        let specialChar = 'پسورد مورد نظر باید شامل اعداد حروف بزرگ و کوچک و علامت ها خاص باشد!';
        message.specialChar = specialChar;
        regexValid = true;
    }

    if (lengthValid || regexValid) {
        valid = true;
    }

    return {message,valid};
}

/*Description:check if name is unique more than 3 charachter
*@return :object
* */

export function checkName(name,exName,userNameList,t) {
    let valid;
    let length;
    let unique;
    let currentNameList = [];
    if (exName !== "null") {
        for (let item of userNameList) {
            currentNameList.push(item);
        }
        let currentIndex = currentNameList.indexOf(exName);
        currentNameList.splice(currentIndex, 1);
    } else {
        currentNameList = userNameList;
    }

    if (name.length < 3) {
        length = t('translation:3LeastNumber')
        valid = true;
    } else if (currentNameList.includes(name)) {
        unique = t('translation:uniqueValidation');
        valid = true;
    }
    return {unique,length,valid};
}

/*Description:get name and mail from users list in an array
*@return :object
* */
export function getUsersNameAndMail(users) {
    let nameList = [];
    let mailList = [];
    users.map(user => {
        nameList.push(user.name);
        mailList.push(user.mail);
    });
    return{nameList,mailList}
}

export default {checkPassWithConfirm,checkMail,checkPass,checkName,getUsersNameAndMail}