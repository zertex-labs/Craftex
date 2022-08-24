import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import { createStyles, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useListState } from "@mantine/hooks";

import type { Plugin } from "@utils/types/craftex";
import { ListCreateInputs, ListCreateSchema } from "./schemas";
import ListPluginSearch from "./search.component";
import ListShowcase from "./showcase.component";

const useStyles = createStyles((theme) => ({
  overlay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    height: `calc(100vh - ${HEADER_HEIGHT}px - ${theme.spacing.md * 2}px)`,
    width: "100%",
  },
}));

export default function ListCreate() {
  const form = useForm<ListCreateInputs>({
    validate: zodResolver(ListCreateSchema),
    validateInputOnChange: true,
    initialValues: { listName: "", selected: [] },
  });

  const { classes } = useStyles();
  const [selected, handlers] = useListState<Plugin>([]);

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Group className={classes.overlay}>
        <ListShowcase selected={selected} form={form} />
        <ListPluginSearch selected={selected} handlers={handlers} form={form} />
      </Group>
    </form>
  );
}
