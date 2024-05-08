import { FC, MouseEvent } from "react";
import { Signal, useComputed } from "@preact/signals-react";

import { NodeLines } from "./NodeLines";
import { NodeMap } from "../node-map";
import { NodePort } from "../node-port";
import { Vec2 } from "@/library/vec2";
import rsp from "@vicimpa/rsp";
import s from "./NodeLine.module.sass";
import { useProvide } from "@/library/provide";

export type NodeLineProps = {
  mouse: Signal<Vec2>;
  from: NodePort,
  to?: NodePort;
};

export const NodeLine: FC<NodeLineProps> = (props) => {
  const map = useProvide(NodeMap);
  const lines = useProvide(NodeLines);

  const from = useComputed(() => props.from.pos.value);
  const to = useComputed(() => props.to?.pos.value ?? props.mouse.value);
  const x1 = useComputed(() => from.value.x);
  const y1 = useComputed(() => from.value.y);
  const x2 = useComputed(() => to.value.x);
  const y2 = useComputed(() => to.value.y);

  const mouseDown = (event: MouseEvent) => {
    if (!props.to)
      return;

    if (event.button)
      return;

    const offset = map.offset(event);
    const fromDistance = from.peek().distance(offset);
    const toDistance = to.peek().distance(offset);
    const portTo = fromDistance > toDistance ? props.to : props.from;
    const portFrom = fromDistance > toDistance ? props.from : props.to;
    lines.active.value = lines.drop(portTo, portFrom);
  };

  return (
    <g stroke="#fff" fill="#fff" strokeWidth={6}>
      <rsp.line
        {...{ x1, y1, x2, y2 }}
        onMouseDown={mouseDown}
        className={!props.to ? s.nopoint : s.point} />
      {
        !props.to && (
          <>
            <rsp.circle cx={x1} cy={y1} r={2} className={s.nopoint} />
            <rsp.circle cx={x2} cy={y2} r={2} className={s.nopoint} />
          </>
        )
      }
    </g>
  );
}

