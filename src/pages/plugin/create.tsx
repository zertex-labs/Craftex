import OutlineButton from "@components/buttons/outline";
import TextButton from "@components/buttons/text";
import Error from "@components/Error";

import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@trpc";
import { ERROR_LENGTH_MS } from "@utils/constants";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import { z, ZodSchema } from "zod";

interface Inputs {
  title: string;
  developers: {
    email: string;
  }[];
}

const schema: ZodSchema<Inputs> = z.object({
  title: z.string().min(1).max(64),
  developers: z
    .object({
      email: z.string(),
    })
    .array(),
});

export default function PluginCreate() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

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

  useEffect(() => {
    if (errors.title?.message)
      setTimeout(() => clearErrors("title"), ERROR_LENGTH_MS);
  }, [errors.title?.message, clearErrors]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();

    setDisabled(true);

    if (session?.user) {
      mutate({
        ...data,
        author: session.user,
      });
    }

    if (!mutationError) {
      setDisabled(false);
      clearErrors();
    }
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
    <PluginCreateContainer>
      <PluginForm onSubmit={handleSubmit(onSubmit)}>
        <InputHolder>
          <input
            placeholder="My cool plugin"
            className="w-full py-1 outline-none float-none text-sm bg-transparent"
            {...register("title", {
              required: "The title is required",
              disabled,
            })}
            maxLength={64}
            name="title"
          />
        </InputHolder>
        <Error error={errors.title?.message} className="pl-1" />

        <div className="w-full pb-2">
          <ol className="hover:list-decimal space-y-1">
            {developerFields.map((field, index) => (
              <li key={`${field.id}-li`}>
                <InputHolder
                  className={
                    errors?.developers?.[index]?.email ? "border-red-400" : ""
                  }
                >
                  <input
                    key={field.id} // important to include key with field's id
                    placeholder={`[${index}] example@gmail.com`}
                    className={`py-1 outline-none float-none text-sm bg-transparent`}
                    {...register(`developers.${index}.email` as const, {
                      required: true,
                      validate: (v) => z.string().email().safeParse(v).success,
                    })}
                  />

                  <div
                    className="bg-transparent rounded-full hover:bg-gray-100 active:bg-gray-200"
                    title="Remove Developer"
                    onClick={() => developerRemove(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 p-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </InputHolder>
              </li>
            ))}
          </ol>
        </div>

        <div className="w-full flex justify-between px-8">
          <OutlineButton
            title="Add Developer"
            onClick={() =>
              developerAppend({
                email: "",
              })
            }
          />

          <TextButton type="submit" title="Create" />

          <Error error={mutationError?.message}></Error>
        </div>
      </PluginForm>

      <ul className="list-disc">
        {plugins?.map((p) => (
          <>
            <li key={p.id}>{p.title}</li>
            <ol className="list-decimal pl-8 pb-4">
              {p?.developers?.map((d) => (
                <li key={`${d.id}`}>{`${d.name} (${d.email}) >> ${d.id}`}</li>
              ))}
            </ol>
          </>
        ))}
      </ul>
    </PluginCreateContainer>
  );
}

const PluginCreateContainer = tw.div`
  flex
  flex-col
  items-center
  justify-between

  w-full
  h-2/4
`;

const PluginForm = tw.form`
  flex
  flex-col
  justify-between
  items-center
  space-y-1

  w-1/3
`;

const InputHolder = tw.div`
  flex
  flex-row
  items-start

  border
  border-gray-400
  text-gray-600

  justify-between

  px-2
  py-1.5
  w-full

  rounded-lg
  focus-within:border

  focus-within:border-gray-500
  focus-within:text-gray-900
`;
