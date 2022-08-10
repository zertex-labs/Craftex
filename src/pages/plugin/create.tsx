import { trpc } from "@trpc";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

interface Inputs {
  title: string;
  developers: {
    email: string;
  }[];
}

const options: { value: { email: string }; label: string }[] = [
  { value: { email: "rexy@gmail.com" }, label: "Chocolate" },
];

export default function PluginCreate() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    append: developerAppend,
    fields: developerFields,
    remove: developerRemove,
  } = useFieldArray({
    control,
    name: "developers",
  });

  const { mutate, error: mutationError } = trpc.useMutation("plugin.create");
  const { data: plugins } = trpc.useQuery(["plugin.unprotected.all"]);
  const { data: session, status } = useSession();
  const [disabled, setDisabled] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();

    setDisabled(true);

    if (session?.user) {
      mutate({
        ...data,
        author: session.user,
      });
    }

    if (!mutationError) setDisabled(false);
  };

  if (status !== "authenticated") {
    return (
      <>
        <h1>Please sign in.</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

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

        {developerFields.map((field, index) => (
          <li key={field.id}>
            <input
              key={field.id} // important to include key with field's id
              placeholder={`[${index}] example@gmail.com`}
              className={errors?.developers?.[index]?.email ? "error" : ""}
              {...register(`developers.${index}.email` as const, {
                required: true,
                validate: (v) => z.string().email().safeParse(v).success,
              })}
            />

            {errors?.developers?.[index]?.message}

            <button
              key={field.id}
              type="button"
              onClick={() => developerRemove(index)}
            >
              Delete
            </button>
          </li>
        ))}

        <button
          type="button"
          onClick={() =>
            developerAppend({
              email: "",
            })
          }
        >
          Add another developer
        </button>

        <input type="submit" />

        {mutationError?.message}
      </form>

      <ul>
        {plugins?.map((p) => (
          <>
            <li key={p.id}>{p.title}</li>
            <ul>
              {p?.developers?.map((d) => (
                <li key={`${d.id}`}>{`${d.name} (${d.email}) >> ${d.id}`}</li>
              ))}
            </ul>
          </>
        ))}
      </ul>
    </>
  );
}
