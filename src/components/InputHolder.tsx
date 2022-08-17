import tw from "tailwind-styled-components";

export const InputHolder = tw.div`
  flex
  flex-row
  items-start

  border
  border-gray-400
  text-gray-600

  justify-between

  px-2
  py-1.5
  w-full

  rounded-lg
  focus-within:border

  focus-within:border-gray-500
  focus-within:text-gray-900
`;
