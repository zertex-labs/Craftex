import { HTMLAttributes } from "react";
import tw from "tailwind-styled-components";

export type ErrorProps = {
  error: string | undefined;
} & HTMLAttributes<string>;

export const ErrorStyled = tw.span`
    text-red-400
    text-sm
`;

const Error: React.FC<ErrorProps> = ({ error, ...props }) => {
  return <>{error && <ErrorStyled {...props}>{error}</ErrorStyled>}</>;
};

export default Error;
