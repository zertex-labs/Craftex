import { useContext, createContext } from "react";
import type { Plugin } from "@utils/types/craftex";

interface SearchContextActionProps {
  plugin: Plugin;
}


interface SearchContextProps {
  removePlugin: (props: SearchContextActionProps) => void;
  appendPlugin: (props: SearchContextActionProps) => void;
}

export const SearchContext = createContext<SearchContextProps>(null);

export function useSearchContext() {
  return useContext(SearchContext);
}
