import styled from "styled-components"

export const StyledTreeRow = styled.div`
                display:flex;
                justify-content:space-between;
                align-items:center;
`

export const StyledTypographyTitle = styled.span`
                font-size: 13px;
                font-weight: 400;
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
    })
