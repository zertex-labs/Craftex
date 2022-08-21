import DefaultColors from "tailwindcss/colors";

type Color = keyof typeof DefaultColors;

interface ISupportedColor {
  light: {
    background: `bg-${Color}-100/[.5]`;
    text: `text-${Color}-500`;
  };
  dark: {
    background: `dark:bg-${Color}-900`;
    text: `dark:text-${Color}-300`;
  };
}

type SupportedColorKey = "teal" | "violet";

const supportedColors: Record<SupportedColorKey, ISupportedColor> = {
  teal: {
    light: {
      background: `bg-teal-100/[.5]`,
      text: `text-teal-500`,
    },
    dark: {
      background: `dark:bg-teal-900`,
      text: `dark:text-teal-300`,
    },
  },
  violet: {
    light: {
      background: `bg-violet-100/[.5]`,
      text: `text-violet-500`,
    },
    dark: {
      background: `dark:bg-violet-900`,
      text: `dark:text-violet-300`,
    },
  },
};

// tried to do it better... but I'm too dumb

type SupportedColors = typeof supportedColors;

const ResourceCreateDropdown = () => (
  <div className="bg-transparent rounded-full hover:bg-gray-50 active:bg-gray-100">
    <h1>Resource Create Dropdown</h1>
  </div>
);

export default ResourceCreateDropdown;
