import { DetailedHTMLProps, HTMLAttributes } from "react";

const OutlineButton: React.FC<
  { text: string } & HTMLAttributes<HTMLButtonElement>
> = ({ text, ...props }) => (
  <button
    type="button"
    className="
      py-1.5
      px-3
      text-xs
      font-medium
      text-center
      border
      border-primary
      text-primary
      bg-transparent
      rounded-lg
      hover:bg-primary-200/[.03]
      focus:border-primary-200
      focus:text-primary-200
      "
    {...props}
  >
    {text}
  </button>
);

export default OutlineButton;
