import { Badge, createStyles } from "@mantine/core";
import { IconStar } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[6]
        : theme.colors.orange[5],
    gap: 0,
  },

  icon: {
    fill:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[6]
        : theme.colors.orange[5],
  },
}));

const StarsShowcase: React.FC<{ stars: number }> = ({ stars }) => {
  const { classes, theme } = useStyles();

  return (
    <Badge
      p={6}
      leftSection={<IconStar size={10} className={classes.icon} />}
      className={classes.root}
    >
      {stars}
    </Badge>
  );
};

export default StarsShowcase;
