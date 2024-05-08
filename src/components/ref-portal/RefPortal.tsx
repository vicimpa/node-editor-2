import { ReactNode } from "react";
import { RefPortalProvider } from "./RefPortalCtx";
import { SignalRef } from "@/library/signals";
import { computed } from "@preact/signals-react";
import { createPortal } from "react-dom";

export type RefPortalProps<T> = {
  target: SignalRef<T>;
  children?: ReactNode;
};

export const RefPortal = <T extends Element>(
  props: RefPortalProps<T>
) => (
  <>
    {
      computed(() => {
        const elem = props.target.value;

        if (!elem)
          return null;

        return (
          <RefPortalProvider value={elem}>
            {createPortal(props.children, elem)}
          </RefPortalProvider>
        );
      })
    }
  </>
);