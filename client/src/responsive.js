// import {css} from "styled-components"

// export const mobile=(props)=>{
//     return css`
//         @media only screen and (max-width:380px){
//             ${props};
//         }
//     `;
// }


// import React from "react";
import { css } from "styled-components";
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 500px) {
      ${props};
    }
  `;
};
