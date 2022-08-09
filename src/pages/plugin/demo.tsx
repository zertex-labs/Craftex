import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";

interface Inputs {
  title: string;
  developer: {
    email: string;
    name: string;
  };
}

export default function PluginDemo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutate, error: mutationError } = trpc.useMutation("plugin.create");
  const { data: plugins } = trpc.useQuery(["plugin.unprotected.all"]);

  const [disabled, setDisabled] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();

    setDisabled(true);

    mutate({
      title: data.title,
    });

    if (!mutationError) setDisabled(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Your title here"
          {...register("title", {
            required: "The title is required",
            disabled,
          })}
        />
        {errors.title?.message}

        <input
          placeholder="example@craftex.dev"
          {...register("developer.email", { required: "Who u?", disabled })}
        />
        {errors.developer?.email?.message}

        <input
          placeholder="xrexy"
          {...register("developer.name", {
            required: "??? name pls",
            disabled,
          })}
        />
        {errors.developer?.name?.message}

        <input type="submit" />

        {mutationError?.message}
      </form>

      <ul>
        {plugins?.map((p) => (
          <>
            <li key={p.id}>{p.title}</li>
            <ul>
              {p?.developers?.map((d) => (
                <li>{`${d.name} (${d.email}) >> ${d.id}`}</li>
              ))}
            </ul>
          </>
        ))}
      </ul>
    </>
  );
}
