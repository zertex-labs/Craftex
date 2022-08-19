import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { useRef } from "react";
import { IconType } from "react-icons";
import { FiUpload } from "react-icons/fi";
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
    <Dropdown
      key="plugin-create-dropdown"
      arrowIcon={false}
      inline={true}
      label={<FiUpload className="h-8 w-8 p-2" />}
    >
      <Dropdown.Item>
        <DropdownItem
          title="Upload new plugin"
          description="A new software version is available for download."
          color="teal"
          redirect="/plugin/create"
          icon={FiUpload}
        />
      </Dropdown.Item>
      <Dropdown.Item>
        <DropdownItem
          title="Create new list"
          description="A new software version is available for download."
          color="violet"
          redirect="/list/create"
          icon={FiUpload}
        />
      </Dropdown.Item>
    </Dropdown>
  </div>
);

const DropdownItem: React.FC<{
  title: string;
  description: string;
  icon: IconType;
  color: keyof SupportedColors;
  redirect: string;
}> = ({ description, title, icon: Icon, color, redirect }) => {
  const {
    current: { dark, light },
  } = useRef(supportedColors[color]);

  return (
    <Link href={redirect}>
      <a className="flex !items-start">
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${light.background} ${light.text} ${dark.background} ${dark.text}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
          <div className="mb-2 text-sm font-normal">{description}</div>
        </div>
      </a>
    </Link>
  );
};

export default ResourceCreateDropdown;
