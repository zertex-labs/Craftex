import { List, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDebouncedState } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import React, { useEffect } from "react";
import { object, string, ZodType } from "zod";

interface Inputs {
  pluginName: string;
}

const Schema: ZodType<Inputs> = object({
  pluginName: string().min(2, "Plugin name must be at least 2 characters"),
});

// TODO

export default function ListCreate() {
  const [pluginName, setPluginName] = useDebouncedState("", 500);

  const { data } = trpc.useQuery(
    [
      "plugin.unprotected.filtered",
      {
        filter: pluginName,
      },
    ],
    {
      enabled: Schema.safeParse({ pluginName }).success,
      onSuccess: (data) => {
        if (data.length < 1)
          setFieldError(
            "pluginName",
            "We couldn't find a plugin with that name"
          );
      },
    }
  );

  const { onSubmit, getInputProps, setFieldError } = useForm<Inputs>({
    validate: zodResolver(Schema),
    validateInputOnChange: true,
    initialValues: { pluginName: "" },
  });
  
  return (
    <React.Fragment>
      <h1>List Create {Schema.safeParse({ pluginName }).success + ""}</h1>

      <form onSubmit={onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Plugin name"
          onInput={({ currentTarget: { value } }) => setPluginName(value)}
          {...getInputProps("pluginName")}
        />
      </form>

      <ul>
        {data && data.map((p) => <PluginShowcase key={p.id} plugin={p} />)}
      </ul>
    </React.Fragment>
  );
}

const PluginShowcase: React.FC<{ plugin: Plugin }> = ({ plugin }) => (
  <li key={plugin.id}>
    <Text
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
      size="xl"
      weight={600}
      component={NextLink}
      href={`/plugin/view/${plugin.id}`}
    >
      {plugin.title}
    </Text>
    <List>
      {plugin.developers.map((developer) => (
        <List.Item key={developer.id}>
          {developer.name} ({developer.email})
        </List.Item>
      ))}
    </List>
  </li>
);
