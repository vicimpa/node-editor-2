import { FC } from "react";
import { NodeLayers } from "../node-layers";
import { NodeLine } from "./NodeLine";
import { NodePort } from "../node-port";
import { Signal } from "@preact/signals-react";
import { TLine } from "./NodeLines";
import { Vec2 } from "@/library/vec2";
import { useProvide } from "@/library/provide";
import { useSignals } from "@preact/signals-react/runtime";

export type NodeLinesViewProps = {
  mouse: Signal<Vec2>;
  lines: Signal<(TLine | NodePort)[]>;
};

export const NodeLinesView: FC<NodeLinesViewProps> = ({ lines, mouse }) => {
  useSignals();
  const { Portal } = useProvide(NodeLayers);

  return (
    <>
      {
        lines.value.map((line) => {
          if (line instanceof NodePort) {
            return (
              <Portal layer="post" key={line.id}>
                <NodeLine
                  mouse={mouse}
                  from={line} />
              </Portal>
            );
          }

          if (line instanceof Array) {

            const [from, to] = line;

            return (
              <Portal layer="pre" key={`${from.id}${to.id}`}>
                <NodeLine
                  mouse={mouse}
                  from={from}
                  to={to} />
              </Portal>
            );
          }

          return null;
        })
      }
    </>
  );
};