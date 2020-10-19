import {makeStyles} from "@material-ui/styles";
import {green,grey,blue,white} from 'components/partials/Colors';
import styled from "styled-components"

// const titleStyles = {};

export const useStyles = makeStyles((theme) => (
    {
        content: {
            border: '1px solid red',
            display: 'block',
            justifyContent: 'space-around',
            width: '100%',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none',  /* IE 10+ */
            padding:theme.spacing(2),
            '&::-webkit-scrollbar': {
                display: "none",
            },
            '& .block': {
                display: 'inline-block',
                border: '1px solid #dee2e6!important',
                borderRadius: '5px',
                backgroundColor: 'white',
                width: '380px',
                padding: '20px',
                boxSizing: 'border-box',
                margin: '5px',
                '&::-webkit-scrollbar': {
                    width: '0px',
                    background: 'transparent',
                },
                '& .text': {
                    display: 'flex',
                    justifyContent: 'space-between',
                },
                '& .chart': {
                    width: '100%',
                    '& .number': {},
                    '& .graphic': {
                        backgroundColor: grey[4],
                        height: '10px',
                        borderRadius: '5px',
                        position: 'relative',
                        overflow: 'hidden',

                        '& .after': {
                            position: 'absolute',
                            border: `1px solid ${green[0]}`,
                            height: '10px',
                            top: '0',
                            backgroundColor: green[0],
                            content: "''",

                        }
                    },
                },

            }
        },
        title: {
            marginBottom: '10px',
            fontSize: '19px',
            fontWeight: '200',
            textAlign:'center',
            padding:theme.spacing(2),
            color:white,
            backgroundImage: `linear-gradient(to right,${blue[5]}, ${green[3]})`,
        },
        myPaper: {
            borderRadius:'20px',
            overflow:'hidden',
            margin: theme.spacing(2),
            backgroundImage: `linear-gradient(to right, ${blue[6]} , ${green[4]})`,
            '@media(max-width:992px)': {
                margin: `${theme.spacing(2)}px 0`,
            }
        }
    }
));

export const ContentChartBlock = styled.div`
            background-image: linear-gradient(to right, ${blue[6]} , ${green[4]});
            display:flex;
`

export const StyledBox = styled.div`
             border:1px solid red;
             width:300px;
             display:flex;
             flex-direction:row;
             justify-content:space-between;
             align-items:center;
             margin:20px;
             padding:2rem;
             
`
