import {blue} from "components/partials/Colors";
import small from "../../svg/check.svg";

export const styledCheckbox= {
    root: {
        cursor:"pointer",
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: 8,
        width: 23,
        height: 23,
        backgroundColor: blue[12],
        border: `1px solid ${blue[13]}`,
        boxSizing:'border-box',
    },
    checkedIcon: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:`2px solid ${blue[13]}`,
        backgroundColor:blue[12],
        '&:before': {
            display: 'block',
            width: '65%',
            height: '65%',
            borderRadius: 8,
            background:`url(${small}) no-repeat`,
            content: '""',
        },
    },
}
