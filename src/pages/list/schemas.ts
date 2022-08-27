import { UseFormReturnType } from "@mantine/form";
import type { Plugin } from "@utils/types/craftex";
import { ListCreateFormProps } from "./create.page";

export type ListCreateInputs = {
  listName: string;
  selected: Plugin[];
};

export type ListSectionProps = {
  selected: Plugin[];
};
