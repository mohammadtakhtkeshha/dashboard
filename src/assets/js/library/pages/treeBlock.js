import styled from "styled-components"
import {StyledDefaultButton} from "assets/js/App";

export const StyledTreeActionButtons = styled.div`
                display:flex;
                justify-content:space-between;
                align-items:center;
`

export const StyledTypographyTitle = styled.span`
                font-size: 13px;
                font-weight: 400;
`
export const StyledButtonsBlock = styled.div`
                padding:0 22px;
                display:flex;
`

export const StyledButtonTree = styled(StyledDefaultButton)`
                display:flex;
                & img{
                    width:22px;
                    height:22px;
                }
`

export const treeStyles = () =>({
        root: {
            height: 110,
            flexGrow: 1,
            '& .rst__rowLabel':{
                width: '100%',
                padding: '0!important',
                '& .rst__rowTitle':{
                    width:'100%'
                }
            }

        },
    }
)
