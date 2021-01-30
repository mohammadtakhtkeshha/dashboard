import styled from "styled-components"
import {white, grey} from "components/partials/Colors"
import {StyledActionButtonBlock} from "assets/js/App"

// ---------------------- DELETE THIS PART ---------------------
export const styledTreeItem = () => ({
    root: {
        "& .MuiTreeItem-group": {
            marginLeft: props => props.lang === "fa" ? "0" : "30px",
            marginRight: props => props.lang === "fa" ? "30px" : "0",
        }
    }
})

// ---------------------- DELETE THIS PART ---------------------
export const styledTreeView = () => ({
    root: {
        backgroundColor: grey[17],
        padding: '20px',
        "& .Mui-selected": {
            "&>.MuiTreeItem-content": {
                "& .MuiTreeItem-label": {
                    backgroundColor: `${white[0]}!important`,
                }
            }
        },
        height: "100%!important",
        maxWidth: "100vw!important",
        "& .MuiTreeItem-label": {
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            margin: '4px',
            padding: props => props.lang === "en" ? "0 0 0 10px" : "0 10px 0 0",
            backgroundColor: 'white',
            borderRadius: "5px",
            // boxShadow: `0 14px 11px #d3d3d5`,
            '&>div': {
                alignItems: 'center',
                justifyContent: 'center',
            }
        }
    }
})

// ---------------------- DELETE THIS PART ---------------------
export const styledGridItem = () => ({
    root: {
        width: '50%',
    }
})

export const styledGridItemAction = () => ({
    root: {
        width: '50%',
        textAlign: props => props.lang === "en" ? "right" : "left",
        '&>div': {
            justifyContent: props => props.lang === "en" ? "flex-start" : "flex-end",
        }
    }
})

export const StyledActionTitle = styled.div`
            padding:0 60px;
`

export const StyledActionButtonBlockWithPadding = styled(StyledActionButtonBlock)`
            padding:22px;
            & button{
                height:35px!important;
            }
`

export const StyledStatus = styled.button`
                padding: 0 22px;
                border-radius: 16px;
                background-color: #3ecd90;
                color: white;
                font-size: 12px;
                cursor:pointer;
                border:0!important;
                &:focus {
                 outline:0!important;
                }
`

