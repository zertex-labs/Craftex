import { createSSG } from "@server/router";
import { trpc } from "@utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = await createSSG();
  const id = context.params?.id as string;

  await ssg.prefetchQuery("plugin.unprotected.byId", {
    id,
  });

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
  const { push: redirect } = useRouter();

  const { data: plugin, isFetching } = trpc.useQuery(
    ["plugin.unprotected.byId", { id }],
    { onError: () => redirect("/"), staleTime: Infinity }
  );

  return (
    <React.Fragment>
      {isFetching && !plugin && <h1>Loading...</h1>}

      {plugin && (
        <React.Fragment>
          <h1>{plugin.title}</h1>

          <h2>Raw data:</h2>
          <pre>{JSON.stringify(plugin, null, 2)}</pre>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
