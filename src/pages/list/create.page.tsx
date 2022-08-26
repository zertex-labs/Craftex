import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import { createStyles, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useListState } from "@mantine/hooks";

import type { Plugin } from "@utils/types/craftex";
import { ListCreateInputs, ListCreateSchema } from "./schemas";
import ListPluginSearch from "./search";
import { SearchContext } from "./context";
import ListShowcase from "./showcase";

const useStyles = createStyles((theme) => ({
  overlay: {
    position: "relative",
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
        <SearchContext.Provider
          value={{
            appendPlugin({ plugin }) {
              handlers.append(plugin);
            },
            removePlugin({ plugin }) {
              handlers.filter(({ id }) => id !== plugin.id);
            },
          }}
        >
          <ListShowcase selected={selected} form={form} />
          <ListPluginSearch selected={selected} form={form} />
        </SearchContext.Provider>
      </Group>
    </form>
  );
}
