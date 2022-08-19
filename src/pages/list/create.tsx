import Error from "@components/Error";
import useDebounce from "@utils/hooks/useDebounce";
import { trpc } from "@utils/trpc";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React, { ChangeEvent, useState } from "react";
import { number, object, string } from "zod";

interface Inputs {
  pluginName: string;
}

const pluginNameValidation = string().min(
  2,
  "Plugin name must be at least 2 characters"
);

const validationSchema = object({
  pluginName: pluginNameValidation,
});

export default function ListCreate() {
  return (
    <React.Fragment>
      <h1>List Create</h1>

      <Formik<Inputs>
        // validationSchema={Schema} TODO Currently no valdiation schema. Formik will be removed and validation will be added from alpha/mantine
        initialValues={{
          pluginName: "",
        }}
        onSubmit={async ({ pluginName }, actions) => {
          console.log(pluginName);
        }}
        component={CreateForm}
      />
    </React.Fragment>
  );
}

const CreateForm: (props: FormikProps<Inputs>) => JSX.Element = ({
  setFieldValue,
  errors,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: filteredPlugins, isFetching } = trpc.useQuery(
    ["plugin.unprotected.filtered", { filter: debouncedSearchTerm }],
    {
      enabled: pluginNameValidation.safeParse(debouncedSearchTerm).success,
    }
  );

  return (
    <Form>
      <Field
        name="pluginName"
        as={InputComponent}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFieldValue("pluginName", e.target.value);
          setSearchTerm(e.target.value);
        }}
      />

      {isFetching && <h1>Loading...</h1>}

      {(filteredPlugins?.length ?? 0) > 0 ? (
        <React.Fragment>
          <h1>{filteredPlugins?.length}</h1>
          <ul>
            {filteredPlugins?.map((plugin) => (
              <li key={plugin.id}>
                {plugin.title} - {plugin.stars}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {errors.pluginName && <Error error={errors.pluginName} />}
          {debouncedSearchTerm.length > 0 && !errors.pluginName && (
            <h1>No results found :/</h1>
          )}
        </React.Fragment>
      )}
    </Form>
  );
};

const InputComponent: React.ComponentType<FieldProps["field"]> = (props) => {
  return (
    <input
      className="w-full py-1 outline-none float-none text-sm bg-transparent"
      {...props}
    />
  );
};
