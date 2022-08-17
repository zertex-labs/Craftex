import { createSSG } from "@server/router";
import { trpc } from "@utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = await createSSG();
  await ssg.prefetchQuery("plugin.unprotected.all");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function PluginView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: plugins, isFetching } = trpc.useQuery([
    "plugin.unprotected.all",
  ]);

  return (
    <React.Fragment>
      {isFetching && !plugins && <h1>Loading...</h1>}

      <h1>{plugins?.length}</h1>

      <h2>Raw data:</h2>
      {plugins?.map((plugin) => (
        <React.Fragment key={plugin.id}>
          <h1>{plugin.title}</h1>
          <pre>{JSON.stringify(plugin, null, 2)}</pre>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
