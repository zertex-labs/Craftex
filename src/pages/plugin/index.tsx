import { trpc } from "../../utils/trpc";

const PluginDemo: React.FC<{}> = () => {
  const { mutate } = trpc.useMutation("plugin.createOnePlugin");
  const {data} = trpc.useQuery(["plugin.findManyPlugin", {}])
  
  function create() {
    mutate({
      data: {
        title: "Test Plugin",
        developers: {
          create: [{ email: "rexy@gmail.com", name: "xrexy" }],
        },
      },
    });
  }

  return (
    <>
      <h1>Plugin Demo</h1>

      <button onClick={create}>Create</button>

      {data && data.map((plugin) => (
        <h1>{plugin.title}</h1>
      ))}
    </>
  );
};

export default PluginDemo;