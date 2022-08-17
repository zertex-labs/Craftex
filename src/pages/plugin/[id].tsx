import { createSSG } from "@server/router";
import { trpc } from "@utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = await createSSG();
  const id = context.params?.id as string;

  console.log(id);

  /*
   * Prefetching the `post.byId` query here.
   * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
   */
  await ssg.prefetchQuery("plugin.unprotected.byId", {
    id,
  });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default function PluginView(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;

  // This query will be immediately available as it's prefetched.
  const { data: plugin, isFetching } = trpc.useQuery([
    "plugin.unprotected.byId",
    { id },
  ]);

  return (
    <React.Fragment>
      {isFetching && !plugin && <h1>Loading...</h1>}

      <h1>{plugin?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(plugin, null, 2)}</pre>
    </React.Fragment>
  );
}
