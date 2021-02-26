import styled from "styled-components"

export const StyledCarsoul = styled.div`
            width:100%;
            height:100%;
            margin:auto;
            direction:ltr;
            & .react-multi-carousel-list {
                margin:auto;
            }
             & .react-multiple-carousel__arrow--left {
                 left: calc(4% + -29px)!important;
                 background:transparent!important;
                 z-index:1!important;
            }
            & .react-multiple-carousel__arrow--right {
                 right: calc(4% + -29px)!important;
                 background:transparent!important;
                z-index:1!important;
            }
            & li {
            }
`

export const StyledDiv = styled.div`
            width:50px;
            height:50px;
            margin:auto;
`
