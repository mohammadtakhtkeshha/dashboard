import {blue, green} from "components/partials/Colors";

export const webHeaderStyle = {
    root: {
        position: 'fixed',
        width: 'calc(100% - 230px)',
        zIndex: '49!important',
        backgroundImage: `linear-gradient(to right,${blue[7]}, ${green[5]})`,
        right:props=>props.lang === 'en' ?'0':'230px',
        left:props=>props.lang === 'en' ? '230px':'0',
        '&.MuiAppBar-colorPrimary': {
            backgroundColor: '#e7ebee',
            boxShadow: '0 0 0 0',
        }
    }
}
