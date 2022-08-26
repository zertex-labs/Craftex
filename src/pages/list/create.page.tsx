import { createStyles, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useListState } from "@mantine/hooks";

import type { Plugin } from "@utils/types/craftex";
import { useEffect } from "react";
import { SearchContext } from "./context";
import { ListCreateInputs, ListCreateSchema } from "./schemas";
import ListPluginSearch from "./search";
import ListShowcase from "./showcase";

export default function ListCreate() {
  const form = useForm<ListCreateInputs>({
    validate: zodResolver(ListCreateSchema),
    validateInputOnChange: true,
    initialValues: { listName: "", selected: [] },
  });

  const [selected, handlers] = useListState<Plugin>([]);

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Group>
        <SearchContext.Provider
          value={{
            appendPlugin({ plugin }) {
              console.log(plugin);

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
