import { trpc } from "@trpc";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@utils/constants";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import tw from "tailwind-styled-components";
import { validationSchema, Inputs } from "./validation";

const InputComponent: React.ComponentType<FieldProps["field"]> = (props) => {
  return (
    <InputHolder>
      <input
        className="w-full py-1 outline-none float-none text-sm bg-transparent"
        {...props}
      />
    </InputHolder>
  );
};

export default function PluginCreate() {
  const { mutate, error: mutationError } = trpc.useMutation("plugin.create");
  const { data: plugins } = trpc.useQuery(["plugin.unprotected.all"]);
  const { data: session, status } = useSession();
  const [disabled, setDisabled] = useState(false);

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
      <PluginFormContainer>
        <Formik<Inputs>
          initialValues={{
            cover: undefined,
            developers: [],
            title: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });

            alert(JSON.stringify(values, null, 2));

            actions.setSubmitting(false);
          }}
          component={CreateForm}
        />
      </PluginFormContainer>
    </PluginCreateContainer>
  );
}

const CreateForm: (props: FormikProps<Inputs>) => JSX.Element = ({
  setFieldValue,
}) => {
  return (
    <Form>
      <Field
        as={InputComponent}
        id="title"
        name="title"
        placeholder="First Name"
      />

      <InputHolder>
        <input
          id="cover"
          name="cover"
          type="file"
          onChange={(e) => setFieldValue("cover", e.target.files?.[0])}
        />
      </InputHolder>

      <button type="submit">Submit</button>
    </Form>
  );
};

const PluginCreateContainer = tw.div`
  flex
  flex-col
  items-center
  justify-between

  w-full
  h-2/4
`;

const PluginFormContainer = tw.div`
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
