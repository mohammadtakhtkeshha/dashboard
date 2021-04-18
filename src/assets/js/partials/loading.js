import styled from 'styled-components'
import {green} from 'assets/js/library/abstracts/colors';

export const StyledLoadingBox = styled.div`
            position: fixed;
            left: 10px;
            right: 10px;
            text-align: center;
            margin: auto;
            display:${props => props.loading === true ? 'flex' : 'none'};
            justify-content: center;
            align-items: center;
            z-index: ${props => props.loading === true ? '1000' : '-10'};
            background: radial-gradient(#e7e2e2, transparent);
            opacity:.5;
            top: 0;
            bottom: 0;
            & svg{
              color:${green[0]};
            }
          }
`
