import { FC, PropsWithChildren } from "react";

import { NodeConnects } from "../node-connects";
import { NodeLayers } from "../node-layers";
import { NodeLine } from "./NodeLine";
import { useComputed } from "@preact/signals-react/runtime";
import { useProvide } from "@/library/provide";

export const NodeLines: FC<PropsWithChildren> = ({ children }) => {
  const { Portal } = useProvide(NodeLayers);
  const { active, complate: lines } = useProvide(NodeConnects);

  return (
    <>
      {
        useComputed(() => (
          lines.value.map(([from, to]) => (
            <Portal layer="pre" key={`${from.id}${to.id}`}>
              <NodeLine from={from} to={to} />
            </Portal>
          ))
        ))
      }
      {children}
      {
        useComputed(() => (
          active.value.map((from) => (
            <Portal layer="post" key={from.id}>
              <NodeLine from={from} />
            </Portal>
          ))
        ))
      }
    </>
  );
};