import tw from "tailwind-styled-components";

export const OutlineStyled = tw.button`
  p-0
  py-1
  px-2
  min-w-min
  text-sm
  shrink-0

  bg-transparent
  text-primary
  font-semibold 
  border 
  border-primary
  rounded-full

  hover:bg-primary-light/[.05]
`;

const OutlineButton: React.FC<ButtonProps> = ({
  title,
  ...props
}) => {
  return <OutlineStyled type="button" {...props}>{title}</OutlineStyled>;
};

export default OutlineButton;
