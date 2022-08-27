import { Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { PluginSchema } from "@server/router/global.schema";
import { trpc } from "@utils/trpc";

import type { Plugin } from "@utils/types/craftex";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { object, string } from "zod";
import { SearchContext } from "./context";
import ListPluginSearch from "./search";
import ListShowcase from "./showcase";

export type ListCreateFormProps = {
  listName: string;
  selected: Plugin[];
};

export default function ListCreate() {
  const form = useForm<ListCreateFormProps>({
    validate: zodResolver(
      object({
        listName: string().min(8, "List name must be at least 8 characters"),
        selected: PluginSchema.array().length(
          2,
          "List must containt at least 2 plugins"
        ),
      })
    ),
    validateInputOnChange: true,
    initialValues: { listName: "", selected: [] },
  });

  const [selected, handlers] = useListState<Plugin>([]);
  const { mutate: createList } = trpc.useMutation(["list.create"]);
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <React.Fragment>
        <h1>Please sign in.</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </React.Fragment>
    );
  }

  return (
    <form
      onSubmit={form.onSubmit(({ listName }) =>
        createList({ listName, selected, userId: session.user!.id })
      )}
    >
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
          <ListPluginSearch selected={selected} />
        </SearchContext.Provider>
      </Group>
    </form>
  );
}
