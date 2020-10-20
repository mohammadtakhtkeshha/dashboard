import {grey, green,white} from "../../components/partials/Colors";
import styled from "styled-components";

export const StyledPaginationBox = styled.div`
          &>nav {
            display: flex;
            justify-content: center;
            padding: 20px;
            & ul{
                & li {
                    cursor:pointer;
                    & button {
                        border-radius: 0;
                        margin: 0;
                        border-color: ${grey[3]};
                        color: ${green[0]};
                        padding: 13px;
                    }
                }
            }
            & .MuiPaginationItem-page.Mui-selected {
                background-color: ${green[0]};
                color: ${white[0]};
                border: 0;
            }
        }
`

export default {StyledPaginationBox};



