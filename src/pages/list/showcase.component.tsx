import {
  createStyles,
  Divider,
  Group,
  ScrollArea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { format } from "path";
import { ListSectionProps } from "./schemas";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    paddingRight: theme.spacing.md,

    display: "flex",
    justifyContent: "space-between",
    gap: 0,
  },

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  submitButton: {
    fontWeight: 900,
    borderRadius: theme.spacing.xs / 2,
    padding: `8px ${theme.spacing.sm}px`,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
}));

const ListShowcase: React.FC<ListSectionProps> = ({
  selected,
  form: { getInputProps },
}) => {
  const { classes, theme } = useStyles();

  return (
    <Group className={classes.root}>
      <Group
        px={theme.spacing.xl}
        pb={theme.spacing.sm}
        className={classes.header}
      >
        <TextInput
          sx={{ width: "40%" }}
          placeholder="My awesome list!"
          icon={<IconPencil size={12} />}
          {...getInputProps("listName")}
        />

        <UnstyledButton type="submit" className={classes.submitButton}>
          Create
        </UnstyledButton>
      </Group>

      <Divider sx={{ width: "100%" }} />

      <ScrollArea
        pt={theme.spacing.sm}
        sx={{ width: "100%", height: "100%", display: "block" }}
      >
        {selected &&
          selected.map((plugin) => (
            <h1 key={plugin.id}>
              {plugin.title} - {plugin.id}
            </h1>
          ))}
      </ScrollArea>
    </Group>
  );
};

export default ListShowcase;
