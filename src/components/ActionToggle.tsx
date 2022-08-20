import {
  ActionIcon,
  Group,
  MantineNumberSize,
  Tuple,
  useMantineColorScheme,
} from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import { MouseEventHandler } from "react";

type ActionToggleProps = {
  icons: Tuple<TablerIcon, 2>;
  colors: Tuple<string, 2>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  shouldToggle: boolean;
  size?: MantineNumberSize;
};

const ActionToggle: React.FC<ActionToggleProps> = ({
  icons: { "0": IconFirst, "1": IconSecond },
  colors,
  onClick,
  shouldToggle,
  size = "md",
}) => {
  return (
    <Group position="center">
      <ActionIcon
        onClick={onClick}
        size={size}
        sx={(theme) => ({
          borderRadius: 8,
          borderColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[8]
              : theme.colors.gray[3],

          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? colors[0] : colors[1],
        })}
      >
        {shouldToggle ? <IconFirst size={16} /> : <IconSecond size={16} />}
      </ActionIcon>
    </Group>
  );
};

export default ActionToggle;
