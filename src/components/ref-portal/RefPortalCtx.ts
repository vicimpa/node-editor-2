import { createContext, useContext } from "react";

const Context = createContext<Element | null>(null);

export const useRefPortal = () => {
  const ctx = useContext(Context);

  if (!ctx)
    throw new Error('No find element');

  return ctx;
};

export const {
  Provider: RefPortalProvider
} = Context;