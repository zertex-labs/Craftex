const TextButton: React.FC<{ text: string }> = ({ text }) => (
  <button
    type="button"
    className="
    py-1.5
    px-3
    text-xs
    font-medium
    text-center
    text-text
    border
    border-transparent
    hover:border-gray-100
    bg-transparent
    rounded-lg
    focus:border-gray-200
    "
  >
    {text}
  </button>
);

export default TextButton;
