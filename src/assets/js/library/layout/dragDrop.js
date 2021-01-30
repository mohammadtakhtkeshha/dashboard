import styled from "styled-components";
import moveIcon from "../../../media/image/move-icon.svg"
import {grey} from "components/partials/Colors";
import {StyledNotScrollbar} from "assets/js/App";

export const StyledTreeTable = styled(StyledNotScrollbar)`
        width:100%;
        background-color:${grey[17]};
        & .rst__expandButton{
            // display:none;
        }
        & .rst__lineBlock, .rst__absoluteLineBlock{
            // display:none;
        }
         & .rst__nodeContent{
            left:${props => props.lang === "en" ? "none" : "4px"}!important;
            right:${props => props.lang === "en" ? "4px" : "none"}!important;

         }
         & .rst__rowLabel {
            width:100%;
            display:flex;
            justify-content:space-between;
         }
          & .ReactVirtualized__Grid {
              &::-webkit-scrollbar {
               display: none;
           }
            /* Hide scrollbar for IE, Edge and Firefox */
             & {
            -ms-overflow-style: none;  /* IE and Edge */
             scrollbar-width: none;  /* Firefox */
             }
         }

          & .rst__moveHandle {
           background:transparent url(${moveIcon}) no-repeat center!important;
           // background:none!important;
           border: 0!important;
            box-shadow: 0 0 0!important;
           -webkit-box-shadow: 0 0 0!important;
           cursor: move;
           border-radius: 1px;
           z-index: 1;
         }
         & .rst__collapseButton {
           // display:none;
         }

         & .rst__lineChildren {
           // display:none;
         }

         & .rst__rowLandingPad {
           // display:none;
         }

         & .rst__rowContents {
           box-shadow:0 0 0!important;
           border:0!important;
           // height:70px;
         }

         & .rst__node {
         //   display:block!important;
         //   height:100px!important;
         }

         & .ReactVirtualized__Grid__innerScrollContainer {
         }

         & .ReactVirtualized__Grid .ReactVirtualized__List .rst__virtualScrollOverride{
           // border:1px solid blue!important;
         }

          & .rst__nodeContent{
           // border:1px solid blue!important;
           // display:block!important;
         }

`
