import { createStyles, Grid, ScrollArea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDebouncedState, useListState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";

import {
  ListCreateInputs,
  ListCreateSchema,
  PluginNameSchema,
} from "./_schemas";
import ListPluginSearch from "./_search";
import ListShowcase from "./_showcase";
import type { Plugin } from "@utils/types/craftex";
import { Draggable } from "react-beautiful-dnd";

const useStyles = createStyles((theme) => ({
  overlay: {},
}));

export default function ListCreate() {
  const form = useForm<ListCreateInputs>({
    validate: zodResolver(ListCreateSchema),
    validateInputOnChange: true,
    initialValues: { pluginName: "", selected: [] },
  });

  const { classes, theme } = useStyles();
  const [selected, handlers] = useListState<Plugin>([]);

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Grid className={classes.overlay}>
        <ListShowcase selected={selected} form={form} span={9} />
        <ListPluginSearch
          selected={selected}
          handlers={handlers}
          form={form}
          span={3}
        />
      </Grid>
    </form>
  );
}
