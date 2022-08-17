import React, { HTMLAttributes } from "react";
import tw from "tailwind-styled-components";

export type ErrorProps = {
  error: string | undefined;
} & HTMLAttributes<string>;

export const ErrorStyled = tw.span`
    text-red-400
    text-sm
`;

const Error: React.FC<ErrorProps> = ({ error, ...props }) => {
  return (
    <React.Fragment>
      {error && <ErrorStyled {...props}>{error}</ErrorStyled>}
    </React.Fragment>
  );
};

export default Error;
