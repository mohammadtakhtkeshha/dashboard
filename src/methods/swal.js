import swal from "sweetalert";
import 'App.css';

export function success(title,buttonText) {
    swal({
        text: title,
        button: {
            text: buttonText
            , className: 'confirmSwalButton'
        },
        className: 'makeSwalButtonCenter',
        icon: "success"
    });
}

export function warning(title,buttonText,cancelText,notDone,successfullyMethod) {
    swal({
        title: title,
        icon: "warning",
        buttons: {
            confirm: {
                text: buttonText,
                value: true,
                visible: true,
                className: "",
                closeModal: true
            },
            cancel: {
                text: cancelText,
                value: null,
                visible: true,
                className: "",
                closeModal: true,
            }
        },
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            successfullyMethod();
        }else{
            success(notDone,buttonText)
        }
    });
}

export function danger(title,buttonText) {
    swal({
        text: title,
        button: {
            text: buttonText
            , className: 'dangerSwalButton'
        },
        className: 'makeSwalButtonCenter',
        icon: "error"
    });
}

export default {success,warning,danger}
