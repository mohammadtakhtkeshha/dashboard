import * as colors from "assets/js/library/abstracts/colors";
import styled from "styled-components";

export const useStyles = (theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        '& .block': {
            width: '48%',
            '& .inputBlock': {
                position: 'relative',
                '& .error': {
                    position: 'relative',
                    top: '-11px',
                    textAlign: 'right',
                    color: 'red'
                }
            },
            '& .upload': {
                position: 'relative',
                border: `1px solid ${colors.green[0]}`,
                '& #label': {
                    minHeight: '150px',
                    background: '#fff',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                },
                '& input': {
                    border: '1px solid green',
                    opacity: 0,
                    position: 'absolute!important',
                    width: '100%',
                    height: '100%',
                    top: 0,
                }
            },
            '& .role': {
                '& label': {
                    display: 'block'
                }
            },


        }
    },
    uploadedImgBlock: {
        position: 'relative',
        borderRadius: '20px',
        width: '120px',
        height: '120px',
        '& img': {
            border: '1px solid green',
            width: '100%',
            height: '100%',
            borderRadius: '20px',

        },
        '& .removeImgIcon': {
            position: 'absolute',
            top: '0',
            left: '0',
            color: 'rgba(255,255,255,.4)',
            cursor: 'pointer',
            width: '120px',
            height: '120px',
        }

    },

});

export const StyledFlexColumn = styled.div`
             display:flex;
             flex-direction:row;
             justify-content:space-between;
`

export const StyledFlexItemInside = styled.div`
             width:49%;
             margin-top:15px;
             padding:0 1.5rem;
`

export const StyledRolesBlock = styled.div`
             display:flex;
             flex-direction:column;
             margin-top:25px;
             // & p {
             //   margin:0!important;
             // }
`

export const StyledHeightInput = styled.div`
             height:100px;
`

export const StyledFormControl = styled.fieldset`
             border:0!important;
             padding:0!important;
`



