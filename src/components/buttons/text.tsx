import tw from "tailwind-styled-components";

export const TextStyled = tw.button`
  p-0
  py-1
  px-2
  min-w-min
  text-sm
  shrink-0

  bg-transparent
  text-gray-dark
  font-semibold 
  rounded-full
  border
  border-transparent

  hover:border-gray-dark
`;

const TextButton = ({ title, ...props }: ButtonProps): JSX.Element => {
  return <TextStyled {...props}>{title}</TextStyled>;
};

export default TextButton;
