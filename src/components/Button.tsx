import styled from "styled-components";
import tw from "tailwind-styled-components";

// export const Button = tw.button`
//     outline-0
//     border-4
//     border-primary
//     rounded
//     px-1
//     py-2
//     text-sm
//     font-extrabold
//     text-primary
// bg-primary-light/[.4]
//  `;

export const Button = tw.button`
      bg-transparent
      hover:bg-primary 
      text-primary
      font-semibold 
      hover:text-white
      py-2 
      px-4 
      border 
      border-primary
      hover:border-transparent 
      rounded
  `;

  
export default Button;
