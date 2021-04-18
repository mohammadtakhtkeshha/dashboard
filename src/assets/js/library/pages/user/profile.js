import storage from "libraries/local-storage"
import styled from "styled-components"
import {green} from "assets/js/library/abstracts/colors";

export const styledGridItem = ()=>({
    root:{
        marginTop:'22px'
    }
})

export const currentStyles =(theme) => ({
    openedSidebar: {
        display: 'inline-block',
        backgroundColor: 'white',
        height: '100%'
    },
    show: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        direction: (storage.get('lang') === 'fa' ? 'ltr' : 'rtl'),
        marginTop: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 50,
        overflow: 'hidden',
    },
    notShow: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: '100vh',
        direction: 'ltr',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 50,
        overflow: 'hidden',

    },
    dirLeft:{
        direction:'ltr'
    },
    dirRight:{
        direction:'rtl'
    }
})

export const StyledEditProfileHeader = styled.div`
            height:40vh;
            background-color:${green[6]};
            position:relative;
            & img{
                position:absolute;
                bottom:0;
            }
`